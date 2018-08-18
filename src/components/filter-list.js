import * as PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'react-emotion'
import MonsterTypeBadge from './monster-type-badge'
import { rem } from '../utils/helpers'

const ListBox = styled.div`
  background-image: linear-gradient(90deg, rgba(0,0,0,0.00) 0%, rgba(77,77,77,0.80) 27.5%, rgba(77,77,77,0.80) 82.5%, rgba(0,0,0,0.00) 100%);
`

const ItemList = styled.ul`
  display: flex;
  list-style: none;
  overflow-x: auto;
  margin: 0;
`

const ItemToggle = css`
  position: absolute;
  opacity: 0;
  z-index: -1;
`

const activeLabel = (props) => css`
  opacity: ${props.active ? 1 : 0.5};
`

const SizeLabel = styled.label`
  display: flex;
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  background: black;
  border: .1rem solid white;
  border-radius: 100%;
  color: white;
  text-transform: uppercase;
  ${activeLabel};
`

const TypeLabel = styled.label`
  display: block;
  width: ${rem(90)};
  height: ${rem(115)};
  margin: 0 ${rem(8)};
  text-align: center;
  ${activeLabel};
`

class FilterList extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.string),
    active: PropTypes.arrayOf(PropTypes.string),
    onHandleToggle: PropTypes.func
  }

  static defaultProps = {
    items: [],
    active: []
  }

  constructor (props) {
    super(props)
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle (e) {
    this.props.onHandleToggle({
      'name': e.target.value,
      'active': e.target.checked
    })
  }

  render () {
    const { items, active, listType } = this.props

    const filterInputToggle = (name, isActive) => (
      <input
        type='checkbox'
        checked={isActive}
        className={ItemToggle}
        value={name}
        onChange={this.handleToggle}
      />
    )

    const sizeFilterItem = (name, isActive) => (
      <SizeLabel active={isActive}>
        {filterInputToggle(name)}
        <abbr title={name}>{name.charAt(0)}</abbr>
      </SizeLabel>
    )

    const typeFilterItem = (name, isActive) => (
      <TypeLabel active={isActive}>
        {filterInputToggle(name, isActive)}
        <MonsterTypeBadge
          type={name}
          svgAttrs={{width: '100%'}}
          bgAttrs={{stroke: '#000', fill: 'none'}}
          iconAttrs={{fill: '#fff'}}
        />
        {name}
      </TypeLabel>
    )

    const TypeFilterList = (items) => (
      <ListBox className={css`padding: 0 ${rem(110)};`}>
        <ItemList>
          {items.map((name) => {
            const isActive = active.indexOf(name) !== -1
            return (
              <li key={`filter-${name}`}>
                {typeFilterItem(name, isActive)}
              </li>
            )
          })}
        </ItemList>
      </ListBox>
    )

    const SizeFilterList = (items) => (
      <ItemList>
        {items.map((name) => {
          const isActive = active.indexOf(name) !== -1
          return (
            <li key={`filter-${name}`}>
              {sizeFilterItem(name, isActive)}
            </li>
          )
        })}
      </ItemList>
    )

    return (
      <div>
        {listType === 'type' && TypeFilterList(items)}
        {listType === 'size' && SizeFilterList(items)}
      </div>
    )
  }
}

export default FilterList
