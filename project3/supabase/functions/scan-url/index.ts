import { createClient } from 'npm:@supabase/supabase-js@2.39.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

interface ScanRequest {
  url: string;
  source: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { url, source } = await req.json() as ScanRequest;

    // Simple phishing detection logic (example)
    const suspiciousPatterns = [
      'phish', 'scam', 'free', 'win', 'prize', 'verify',
      'account', 'secure', 'login', 'bank', 'paypal'
    ];

    const domainParts = new URL(url).hostname.split('.');
    const isSuspiciousDomain = suspiciousPatterns.some(pattern => 
      domainParts.some(part => part.toLowerCase().includes(pattern))
    );

    const risk_level = isSuspiciousDomain ? 'high' : 'low';
    const scan_result = {
      suspicious_patterns: isSuspiciousDomain,
      domain: new URL(url).hostname,
      scanned_at: new Date().toISOString(),
    };

    // Insert scan result
    const { data, error } = await supabase
      .from('scans')
      .insert({
        url,
        scan_result,
        risk_level,
        source,
        status: risk_level === 'high' ? 'blocked' : 'allowed'
      })
      .select()
      .single();

    if (error) throw error;

    // Create alert for high-risk URLs
    if (risk_level === 'high') {
      await supabase
        .from('alerts')
        .insert({
          type: 'phishing',
          source,
          url,
          status: 'blocked',
          risk: 'high'
        });
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          risk_level,
          scan_result,
          status: risk_level === 'high' ? 'blocked' : 'allowed'
        }
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});