import React from 'react'
import Styles from '@/styles/category.module.css'

export default function Category() {
  return (
    <>
      <div className={Styles.ContainerEdit}>
        <div className={Styles.SearchBar}>
          <input type="text" placeholder="搜尋分類..." />
        </div>
        <div className={Styles.CategoryGroup}>
          <h3>服飾</h3>
          <ul>
            <li>
              <a href="#">女裝</a>
              <ul className={Styles.SubcategoryList}>
                <li>
                  <a href="#">上衣</a>
                </li>
                <li>
                  <a href="#">外套</a>
                </li>
                <li>
                  <a href="#">褲子</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">男裝</a>
              <ul className={Styles.SubcategoryList}>
                <li>
                  <a href="#">上衣</a>
                </li>
                <li>
                  <a href="#">外套</a>
                </li>
                <li>
                  <a href="#">褲子</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className={Styles.CategoryGroup}>
          <h3>美妝</h3>
          <ul>
            <li>
              <a href="#">彩妝</a>
            </li>
            <li>
              <a href="#">護膚</a>
            </li>
            <li>
              <a href="#">香水</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
