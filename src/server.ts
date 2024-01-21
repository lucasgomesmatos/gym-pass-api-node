import { app } from '@/app'
import { environment } from '@/env'

app
  .listen({
    host: '0.0.0.0',
    port: environment.PORT,
  })
  .then((address) => {
    console.log(`🔥 HTTP Server Running! ${address}`)
  })
