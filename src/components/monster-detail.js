import * as PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'react-emotion'
import texture from '../assets/images/dark-card-bg.jpg'
import StatChart from './monster-stat-chart'
import StatList from './monster-stat-list'
import StatBarChart from './monster-stat-barchart'

// import Link from "gatsby-link"
import Img from 'gatsby-image'

// import presets from "../utils/presets"
// import typography, { rhythm, scale } from "../utils/typography"

const Container = styled.div`
  max-width: 100rem;
  padding: 0 1.25rem;
  margin: 1.25rem auto;
`

const Mast = styled.div`
  position: relative;
  height: 25rem;
  background: url(${texture});
`
const mastImgStyle = {
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
}

class MonsterDetail extends React.Component {
  static propTypes = {
    monster: PropTypes.shape({
      name: PropTypes.string.isRequired,
      size: PropTypes.string,
      type: PropTypes.string,
      alignment: PropTypes.string,
      hp: PropTypes.number,
      str: PropTypes.number,
      dex: PropTypes.number,
      con: PropTypes.number,
      int: PropTypes.number,
      wis: PropTypes.number,
      cha: PropTypes.number
    }).isRequired
  }

  render () {
    const { image } = this.props
    const { name, size, type, alignment, hp } = this.props.monster
    const { str, dex, con, int, wis, cha } = this.props.monster
    const stats = [
      { attr: 'Strength', label: 'STR', value: str },
      { attr: 'Dexterity', label: 'DEX', value: dex },
      { attr: 'Constitution', label: 'CON', value: con },
      { attr: 'Intelligence', label: 'INT', value: int },
      { attr: 'Wisdom', label: 'WIS', value: wis },
      { attr: 'Charisma', label: 'CHA', value: cha }
    ]

    console.debug('monster', this.props.monster)

    const MonsterImage = () => (
      <Mast className={css`object-fit: cover;`}>
        {image && (<Img sizes={{ ...image.sizes }} style={mastImgStyle} />)}
      </Mast>
    )

    const MonsterDetails = () => (
      <div>
        <MonsterImage />
        <Container>
          <h1 className={css`text-align: center;`}>{name}</h1>
          <div className={css`display:flex;`}>
            <section className={css`width:20rem;margin-right:1.25rem;`}>
              <h2 className={css`text-align: center;`}>Gallery</h2>
            </section>
            <section className={css`width:20rem;margin-right:1.25rem;`}>
              <h2 className={css`text-align: center;`}>Ability Scores</h2>
              <div>
                <StatChart data={stats} />
                <StatList data={stats} />
                <StatBarChart data={stats} />
              </div>
            </section>
            <div>
              <dl>
                <div>
                  <dt>Size</dt>
                  <dd>{size}</dd>
                </div>
                <div>
                  <dt>Type</dt>
                  <dd>{type}</dd>
                </div>
                <div>
                  <dt>Alignment</dt>
                  <dd>{alignment}</dd>
                </div>
                <div>
                  <dt>HP</dt>
                  <dd>{hp}</dd>
                </div>
              </dl>
              <div className={css`max-width: 37.5rem;`}>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, aspernatur reprehenderit ullam neque voluptatem omnis a dolore quo voluptate, est iste quos nemo assumenda commodi cumque consectetur, ipsum debitis distinctio?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, aspernatur reprehenderit ullam neque voluptatem omnis a dolore quo voluptate, est iste quos nemo assumenda commodi cumque consectetur, ipsum debitis distinctio?</p>
                <p>Deserunt temporibus repudiandae quia natus, explicabo aut sapiente pariatur hic! Necessitatibus, culpa. Deserunt dolore suscipit hic, vel pariatur quisquam alias sint quo, expedita reiciendis dicta distinctio voluptates necessitatibus assumenda doloremque!Deserunt temporibus repudiandae quia natus, explicabo aut sapiente pariatur hic! Necessitatibus, culpa. Deserunt dolore suscipit hic, vel pariatur quisquam alias sint quo, expedita reiciendis dicta distinctio voluptates necessitatibus assumenda doloremque!</p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    )

    return (
      <MonsterDetails />
    )
  }
}

export default MonsterDetail

export const MonsterDetailFragment = graphql`
  fragment MonsterMast_img on ImageSharp {
    sizes: sizes(
      maxWidth: 1600
      maxHeight: 400
      quality: 80
      traceSVG: { background: "#27282C", color: "#000000" }
    ) {
      ...GatsbyImageSharpSizes_tracedSVG
    }
  }
  fragment MonsterFields on MonstersSrd5EJson {
    name
    size
    type
    subtype
    alignment
    ac: armor_class
    hp: hit_points
    cr: challenge_rating
    int: intelligence
    str: strength
    cha: charisma
    con: constitution
    wis: wisdom
    dex: dexterity
  }
`
