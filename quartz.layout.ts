import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.Comments({
      provider: "hyvor_talk",
      options: {
        websiteId: process.env.HYVOR_WEBSITE_ID || "11990",
      },
    }),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/mehdiboukrif/quartz-garden",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
      folderClickBehavior: "collapse",
      folderDefaultState: "collapsed",
      useSavedState: true,
    }),
  ],
  right: [
    Component.Graph({
      localGraph: {
        repelForce: 0.6,
        linkDistance: 50,
        fontSize: 0.35,
      },
      globalGraph: {
        repelForce: 0.9,
        linkDistance: 70,
        fontSize: 0.28,
        opacityScale: 0.3,
      },
    }),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      folderClickBehavior: "collapse",
      folderDefaultState: "collapsed",
      useSavedState: true,
    }),
  ],
  right: [],
}
