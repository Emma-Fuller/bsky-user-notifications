import { Server } from '../lexicon'
import { Record } from '../lexicon/types/app/bsky/feed/post'
import { CreateOp } from '../util/subscription'

const TO_INCLUDE_LIST = [
    'did:plc:3nodfbwjlsd77ckgrodawvpv', // Rem
    'did:plc:p3vdrhjpqfnrj5523b5dnl7c', // Stas
    'did:plc:funyx6lhibbiivqw6lst7eik', // Me (Emma)
]

function createPostLink(author: String, uri: String) {
    const postSlug = uri.split('/').at(-1)
    return `https://bsky.app/profile/${ author }/post/${ postSlug }`
}

export function handlePost(post: CreateOp<Record>, server: Server) {
    const isFriend = TO_INCLUDE_LIST.includes(post.author)
    if (!isFriend) return

    console.log(post.record.text)
    console.log(createPostLink(post.author, post.uri))
    console.log('----------')
}