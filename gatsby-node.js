const Promise = require(`bluebird`)
const _resolve = require(`path`).resolve
const { relative } = require(`path`)
const { existsSync } = require('fs')
const slug = require(`slug`)
const slash = require(`slash`)

const slugify = (text) => {
  return slug(text, {lower: true})
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMonstersSrd5EJson {
              edges {
                node {
                  name
                  type
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(new Error(result.errors))
        }

        const monsterTemplate = _resolve(`src/templates/monster-page.js`)

        result.data.allMonstersSrd5EJson.edges.map(({ node }) => {
          const slug = slugify(node.name)
          createPage({
            path: `/monster/${slug}/`,
            component: slash(monsterTemplate),
            context: {
              name: node.name,
              imgRegexType: `/monster-types/${node.type}/`,
              imgRegexMonster: `/monsters/${slug}/`
            }
          })
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators

  if (node.internal.type === `MonstersSrd5EJson`) {
    const data = _resolve(__dirname, './data/')
    const monsterTypeImg = _resolve(
      data,
      `./images/monster-types`,
      `${slugify(node.type)}.jpg`
    )
    const monsterImg = _resolve(
      data,
      `./images/monsters`,
      `${slugify(node.name)}.jpg`
    )
    const image = (existsSync(monsterImg)) ? monsterImg : monsterTypeImg

    createNodeField({
      node,
      name: `slug`,
      value: `monster/${slugify(node.name)}`
    })

    createNodeField({
      node,
      name: `cardImage`,
      value: relative(data, image)
    })
  }
}
