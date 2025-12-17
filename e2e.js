(async function(){
  const base = 'http://localhost:3000';
  const passwd = 'TestPass123!';
  const email = `test_${Date.now()}@example.com`;
  const name = 'E2E Test User';
  const headers = { 'Content-Type': 'application/json' };
  function log(title, obj){
    console.log('\n=== ' + title + ' ===');
    console.log(JSON.stringify(obj, null, 2));
  }
  try{
    // Register
    let res = await fetch(base + '/api/register', { method:'POST', headers, body: JSON.stringify({ name, email, password: passwd }) });
    let r = await res.json(); log('register', r);

    // Login
    res = await fetch(base + '/api/login', { method:'POST', headers, body: JSON.stringify({ email, password: passwd }) });
    r = await res.json(); log('login', r);

    // Setup income & savings
    res = await fetch(base + '/api/setup', { method:'POST', headers, body: JSON.stringify({ email, password: passwd, income: 60000, savingsPercent: 10 }) });
    r = await res.json(); log('setup', r);

    // Add expense
    res = await fetch(base + '/api/expense', { method:'POST', headers, body: JSON.stringify({ email, password: passwd, amount: 1200, description: 'Lunch' }) });
    r = await res.json(); log('add expense', r);

    // Dashboard
    res = await fetch(base + '/api/dashboard', { method:'POST', headers, body: JSON.stringify({ email, password: passwd }) });
    r = await res.json(); log('dashboard', r);

    console.log('\nE2E test completed successfully.');
    process.exit(0);
  }catch(err){
    console.error('E2E test failed:', err);
    process.exit(2);
  }
})();
