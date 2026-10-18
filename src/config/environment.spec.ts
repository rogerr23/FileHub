import { validateEnvironment } from './environment';

describe('Environment configuration', () => {
  it('defaults to local access on port 3000', () => {
    expect(validateEnvironment({})).toEqual({ HOST: '127.0.0.1', PORT: 3000 });
  });

  it('converts an explicit port to a number', () => {
    expect(validateEnvironment({ PORT: '3001' }).PORT).toBe(3001);
  });

  it.each(['', 'abc', '3.5', '0', '65536'])(
    'rejects invalid port %j',
    (PORT) => {
      expect(() => validateEnvironment({ PORT })).toThrow('PORT');
    },
  );

  it('rejects an empty host', () => {
    expect(() => validateEnvironment({ HOST: ' ' })).toThrow('HOST');
  });
});
