declare module 'gatsby-plugin-breakpoints' {
  namespace gatsbyPluginBreakpoints {
    interface GatsbyPluginBreakpoints {
      useBreakpoint: () => {
        xs: boolean;
        xsDown: boolean;
        xsUp: boolean;
        sm: boolean;
        smDown: boolean;
        smUp: boolean;
        md: boolean;
        mdDown: boolean;
        mdUp: boolean;
        lg: boolean;
        lgDown: boolean;
        lgUp: boolean;
        xl: boolean;
        xlDown: boolean;
        xlUp: boolean;
      };
    }
  }

  const gatsbyPluginBreakpoints: gatsbyPluginBreakpoints.GatsbyPluginBreakpoints;
  export = gatsbyPluginBreakpoints;
}
