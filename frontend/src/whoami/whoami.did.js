export const idlFactory = ({ IDL }) => {
    return IDL.Service({ 'whoami' : IDL.Func([], [IDL.Principal], ['query']) });
  };
  // eslint-disable-next-line no-unused-vars
  export const init = ({ IDL }) => { return []; };