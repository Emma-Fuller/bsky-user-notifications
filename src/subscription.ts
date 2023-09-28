import { Server } from './lexicon'
import { handlePost } from './_NEWSTUFF'
import {
  OutputSchema as RepoEvent,
  isCommit,
} from './lexicon/types/com/atproto/sync/subscribeRepos'
import { FirehoseSubscriptionBase, getOpsByType } from './util/subscription'

export class FirehoseSubscription extends FirehoseSubscriptionBase {
  server: Server
  addServer(s: Server) { this.server = s }

  async handleEvent(evt: RepoEvent) {
    if (!this.server) return
    if (!isCommit(evt)) return
    const ops = await getOpsByType(evt)

    for (const post of ops.posts.creates) {
      handlePost(post, this.server)
    }
  }
}
