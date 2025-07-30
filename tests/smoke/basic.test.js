describe('Smoke Tests', () => {
  test('Testing framework should work', () => {
    expect(1 + 1).toBe(2);
  });

  test('Environment variables should be accessible', () => {
    expect(process.env).toBeDefined();
    expect(process.env.NODE_ENV).toBeDefined();
  });

  test('Math operations should work correctly', () => {
    expect(Math.max(1, 2, 3)).toBe(3);
    expect(Math.min(1, 2, 3)).toBe(1);
  });

  test('Date operations should work', () => {
    const now = new Date();
    expect(now).toBeInstanceOf(Date);
    expect(now.getTime()).toBeGreaterThan(0);
  });

  test('JSON operations should work', () => {
    const obj = { test: 'value', number: 42 };
    const jsonStr = JSON.stringify(obj);
    const parsed = JSON.parse(jsonStr);
    
    expect(parsed).toEqual(obj);
    expect(parsed.test).toBe('value');
    expect(parsed.number).toBe(42);
  });
}); 