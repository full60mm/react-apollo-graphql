import React from 'react'
import { Link } from 'react-router-dom'
import { Section, Button, Typography, Margin } from 'ui-react-library'
import { Query, ActionButton } from 'components'
import { nl2br } from 'utils/typography'
import { ALL_POSTS, DELETE_POST } from 'modules/blog/gql'


const { H2, P } = Typography

const updatePostCache = (cache, { data: { deletePost } }) => {
  const postsCache = cache.readQuery({ query: ALL_POSTS })
  cache.writeQuery({
    query: ALL_POSTS,
    data: {
      allPosts: postsCache.allPosts.filter(post => post.id !== deletePost.id),
    },
  })
}

export const ListPostsPage = () => (
  <Section>
    <Margin vertical={3}>
      <Link to={`/posts/new`}>
        <Button>create new post</Button>
      </Link>
    </Margin>
    <Query
      query={ALL_POSTS}
    >
      {({ data: { allPosts } }) => (
        allPosts.map(({ id, title, text }) => (
          <div key={id}>
            <H2>{title}</H2>
            <P>{nl2br(text)}</P>
            <Margin right={.25} isInline>
              <Link to={`/posts/${id}`}><Button>detail</Button></Link>
            </Margin>
            <Margin right={.25} isInline>
              <Link to={`/posts/${id}/edit`}><Button>edit</Button></Link>
            </Margin>
            <Margin isInline>
              <ActionButton
                label="delete"
                mutation={DELETE_POST}
                variables={{ id }}
                update={updatePostCache}
                type="error"
              />
            </Margin>
          </div>
        ))
      )}
    </Query>
  </Section>
)

export default ListPostsPage
