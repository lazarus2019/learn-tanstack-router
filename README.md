# Tanstack router

## Route Concepts

Basic route
=> match path exactly
Path:

- /about
- /settings
- /settings/notifications

Index route
=> match exactly and no child route is matched, this route present for home/list page of dynamic route segment
Path:

- /posts

Dynamic route segments
=> route start with $, match exactly
=> dynamic by params
Path:

- /posts/$postId => params: postId
- /posts/$postId/$versionId => params: postId, versionId

Splat/Catch-All routes ($)
=> route with $, catch all URL after $ (/files/documents/hello-world, /files/hello-world)
=> param: \_splat
Path:

- files/$
- files/document/content => \_splat: document/content

Optional path parameters (-)
=> define route segment may/may not present in URL
=> match the base with/without segments
=> syntax: {-$fileId}
Path:
- /posts/{-$category}/{-$slug}: category & slug is optional

Layout route
=> wrap child routes with components and logic

Use cases:
- Layout component
- Run loader before display child routes
- Validate & providing search params to child routes
- Fallback error/pending component 