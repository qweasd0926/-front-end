import React from 'react'

export default function ForgetPassword() {
  return (
    <>
      <div className="container d-flex justify-content-center">
        <div className="border-dark border border-3 rounded p-3 w-75">
          <form>
            <div className="mb-3">
              <h3 className="text-center">
                <strong>忘記密碼</strong>
              </h3>
            </div>
            <div className="mb-3">
              <div className="user-account">
                <label className="form-label ms-2" htmlFor="email">
                  輸入註冊信箱
                </label>
                <input
                  className="form-control rounded"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="輸入信箱"
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="text-center">
                <button
                  type="submit"
                  className="btn rounded border border-3 border-dark btnForget"
                >
                  取得驗證碼
                </button>
              </div>
            </div>
            <div className="mb-3">
              <div className="user-password">
                <label className="form-label ms-2" htmlFor="password">
                  輸入驗證碼
                </label>
                <input
                  className="form-control rounded"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="輸入驗證碼"
                />
              </div>
            </div>
            <div className="mb-3"></div>

            <div className="mb-3">
              <div className="text-center">
                <button
                  type="submit"
                  className="btn rounded border border-3 border-dark btnForget"
                >
                  確認驗證碼
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
