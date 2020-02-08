export const resolvers = {
  Query: {
    currentUser: (parent: any, args: any, ctx: any) => {
      return ctx.user;
    }
  },
  Mutation: {
    logout: (parent: any, args: any, ctx: any) => {
      console.log('logging out...');
      ctx.logout();
    }
  }
};
