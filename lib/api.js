const API_URL = 'https://dev-graceheadless.pantheonsite.io/graphql';

export async function fetchAPI(query, { variables } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables
    })
  });

  const json = await res.json();
  return json.data;
}

export async function getAllPostSlugs() {
  const data = await fetchAPI(`
    {
        posts(first: 1000) {
            edges {
                node {
                    slug
                }
            }
        }
    }
    `);
  return data?.posts;
}

export async function getPostsForHome() {
  const data = await fetchAPI(`
    {
        posts(first: 1000) {
            edges {
                node {
                    title
                    slug
                    date
                    featuredImage {
                        node {
                            sourceUrl
                        }
                    }
                    categories {
                        nodes {
                            name
                            slug
                        }
                    }
                }
            }
        }
    }
    `);
  return data?.posts;
}

export async function getPostWithPagination(pageNum) {
  const data = await fetchAPI(`
    {
        posts(limit: 6, offset: ${pageNum * 6}) {
            edges {
                node {
                    title
                    slug
                    date
                    featuredImage {
                        node {
                            sourceUrl
                        }
                    }
                    categories {
                        nodes {
                            name
                            slug
                        }
                    }
                }
            }
        }
    }
    `);

  console.log(data);
  return data?.posts?.edges;
}

export async function getAllPosts() {
  const data = await fetchAPI(`
    {
        posts(first: 1000) {
            edges {
                node {
                    title
                    excerpt
                    slug
                    date
                    featuredImage {
                        node {
                            sourceUrl
                        }
                    }
                    categories {
                        nodes {
                            name
                            slug
                        }
                    }
                }
            }
        }
    }
    `);
  return data?.posts.edges;
}

export async function getPostAndMorePosts(slug) {
  const data = await fetchAPI(
    `
    fragment PostFields on Post {
        title
        excerpt
        slug
        date
        id
        featuredImage {
            node {
                sourceUrl
                mediaDetails {
                    height
                    width
                }
            }
        }
        categories {
            edges {
              node {
                categoryId
                name
              }
            }
          }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
        post(id: $id, idType: $idType) {
            ...PostFields
            content
        }
        
    }
    `,
    {
      variables: {
        id: slug,
        idType: 'SLUG'
      }
    }
  );

  return data;
}

export async function getAllPageSlugs() {
  const data = await fetchAPI(`
    {
        pages(first: 1000) {
            edges {
                node {
                    slug
                }
            }
        }
    }
    `);
  return data?.pages;
}

export async function getPage(slug) {
  const data = await fetchAPI(
    `
    fragment PageFields on Page {
        title
        slug
        content
        featuredImage {
            node {
                sourceUrl
                mediaDetails {
                    height
                    width
                }
            }
        }
    }
    query PostBySlug($id: ID!, $idType: PageIdType!) {
        page(id: $id, idType: $idType) {
            ...PageFields
        }
    }
    `,
    {
      variables: {
        id: slug,
        idType: 'URI'
      }
    }
  );

  return data.page;
}

export async function getAllCategorySlugs() {
  const data = await fetchAPI(`
    {
        categories(first: 1000) {
            edges {
                node {
                    slug
                }
            }
        }
    }
    `);
  return data?.categories;
}

export async function getPostsForCategory(slug) {
  const data = await fetchAPI(
    `
        fragment PostFields on Post {
            title
            excerpt
            slug
            date
            featuredImage {
                node {
                    sourceUrl
                    mediaDetails {
                        height
                        width
                    }
                }
            }
        }
        query PostsForCategory($id: ID!, $idType: CategoryIdType!) {
            category(id: $id, idType: $idType) {
                posts(first: 1000) {
                    edges {
                        node {
                            ...PostFields
                        }
                    }
                }
            }
        }
        `,
    {
      variables: {
        id: slug,
        idType: 'SLUG'
      }
    }
  );

  return data?.category?.posts?.edges || null;
}

export const getPostForCategory = async (catId, postId) => {
  const data = await fetchAPI(`
  {
    posts(first: 1, where: {categoryId: ${catId}, notIn:"${postId}"}) {
      edges {
        node {
          title
          slug
          date
          id
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
    `);

  return data?.posts?.edges?.[0] || null;
};

export const getSection = async (sectionName, pageSlug) => {
  const data = await fetchAPI(`
  {
    pages(where: {name: "${pageSlug}"}) {
      edges {
        node {
          id
          slug
          ${sectionName} {
            fieldGroupName
            h1
            h6
            p
            bg {
              mediaItemUrl
            }
          }
        }
      }
    }
  }
    `);

  const sectionData = data?.pages?.edges?.[0]?.node?.[sectionName] || null;

  return sectionData;
};
