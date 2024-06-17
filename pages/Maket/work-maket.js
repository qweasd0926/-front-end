<div className="accordion-container">
  <div className="rightContent" id="rightContent" />
  <div className="container col-10 mb-4" id="productList">
    <div className="row-state">
      <div className="col-state">全部</div>
      <div className="col-state">尚未付款</div>
      <div className="col-state">待出貨</div>
      <div className="col-state">運送中</div>
      <div className="col-state">已完成</div>
      <div className="col-state">不成立</div>
      <div className="col-state">退款/退貨</div>
    </div>
    <div className="row-state mb-3">
      <div className="col-auto">
        <div id="dateRangeContainer">
          訂單成立日期
          <input type="text" id="dateRange" readOnly="" />
        </div>
      </div>
    </div>
    <div className="row-state mb-3">
      <div className="col-auto">
        <div className="select-box">
          <div className="select">
            <select>
              <option value="option1">訂單編號</option>
              <option value="option2">商品</option>
              <option value="option3">寄件編號</option>
              <option value="option3">退貨申請單號</option>
              <option value="option3">退貨寄件編號</option>
            </select>
          </div>
        </div>
      </div>
      <div className="col">
        <input
          type="text"
          className="search-input-small"
          placeholder="輸入搜尋..."
        />
      </div>
      <div className="col-auto">
        <button className="search-button">搜尋</button>
        <button className="search-button2">重置</button>
      </div>
    </div>
  </div>
</div>
