import React from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'

function StoreFollowDropdown({ storeLikeData }) {
  return (
    <DropdownButton id="dropdown-basic-button" title="我追蹤的賣場">
      {storeLikeData.map((item, index) => (
        <Dropdown.Item
          href={`/member/store/${item.store_id}`}
          key={index}
          style={{ width: '200px', height: '40px', margin: '8px 0' }}
        >
          {item.photo && (
            <img
              src={
                item.photo !== 'default.png'
                  ? `http://localhost:3003/avatar/${
                      item.photo
                    }?timestamp=${new Date().getTime()}`
                  : '/default.png'
              }
              style={{ width: '45px', height: '40px' }}
            />
          )}{' '}
          {item.nickname}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  )
}

export default StoreFollowDropdown
