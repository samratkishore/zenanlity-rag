const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function testSetup() {
  console.log('🧪 Testing Zenanlity RAG App Setup...\n');

  // Test environment variables
  console.log('1. Checking environment variables...');
  const requiredVars = [
    'AIMLAPI_API_KEY',
    'NEXT_PUBLIC_SUPABASE_URL',
    'SUPABASE_SERVICE_KEY'
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.log('❌ Missing environment variables:', missingVars.join(', '));
    console.log('   Please check your .env.local file');
    return;
  }
  console.log('✅ Environment variables are set\n');

  // Test Supabase connection
  console.log('2. Testing Supabase connection...');
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

    // Test basic connection
    const { data, error } = await supabase.from('documents').select('count').limit(1);
    
    if (error) {
      console.log('❌ Supabase connection failed:', error.message);
      console.log('   Please check your Supabase URL and service key');
      return;
    }
    console.log('✅ Supabase connection successful\n');

    // Test pgvector function
    console.log('3. Testing pgvector function...');
    const { data: funcData, error: funcError } = await supabase.rpc('get_document_count');
    
    if (funcError) {
      console.log('❌ pgvector function test failed:', funcError.message);
      console.log('   Please run the supabase-setup.sql script');
      return;
    }
    console.log('✅ pgvector functions are working\n');

  } catch (error) {
    console.log('❌ Supabase test failed:', error.message);
    return;
  }

  // Test AIMLAPI (basic check)
  console.log('4. Testing AIMLAPI key format...');
  const aimlapiKey = process.env.AIMLAPI_API_KEY;
  if (aimlapiKey && aimlapiKey.startsWith('sk-')) {
    console.log('✅ AIMLAPI key format looks correct\n');
  } else {
    console.log('❌ AIMLAPI key format may be incorrect');
    console.log('   Expected format: sk-xxxxxxxxxxxxx\n');
  }

  console.log('🎉 Setup test completed!');
  console.log('\nNext steps:');
  console.log('1. Run: npm run dev');
  console.log('2. Open: http://localhost:3000');
  console.log('3. Upload a test document');
  console.log('4. Ask questions about your document');
}

testSetup().catch(console.error);
