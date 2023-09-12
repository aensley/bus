import sentryPlugin from '@cloudflare/pages-plugin-sentry'

export const onRequest: PagesFunction<{
  SENTRY_DSN: string
}> = async (context) => {
  return await sentryPlugin({ dsn: context.env.SENTRY_DSN })(context)
}
