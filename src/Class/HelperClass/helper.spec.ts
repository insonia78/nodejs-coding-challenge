import  { HelperClass }  from './helperClass';

test('Testing empty method empty string ',()=>{
    const value = HelperClass.isEmpty("");
    expect(value).toBe(true);
});

test('Testing empty method empty null',()=>{
    const value = HelperClass.isEmpty(null);
    expect(value).toBe(true);
});

test('Testing empty method empty array',()=>{
    const value = HelperClass.isEmpty([]);
    expect(value).toBe(true);
});