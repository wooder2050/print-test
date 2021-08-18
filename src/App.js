import { useState, useCallback, useEffect } from "react";
import Jsbarcode from "jsbarcode";
import "./App.css";

const mockData = {
  shippingInvoice: "1234-1234-5678",
  orderDate: "2020.01.01",
  printPage: 1,
  reprint: 2,
  divisionBarcode: 1234,
  divisionCode: 8,
  receiver: {
    name: "홍길동",
    homePhoneNumber: "02-1234-5678",
    mobilePhoneNumber: "010-1234-5678",
    address:
      "서울 중구 세종대로9길 53 [서소문동 58-12] 홍길동아파트 101동 201호",
    detailAddress: "홍길동아파트 101동 201호",
  },
  invoiceBarcode: 123412345678,
  sender: {
    name: "송화인",
    homePhoneNumber: "02-2468-0246",
    mobilePhoneNumber: "010-2468-0246",
    address: "서울 중구 태종대로9길 53 [서소문동 58-12]",
    detailAddress: "홍길동아파트 102동 301호",
  },
  boxInfo: "극소 B 1",
  fare: 0,
  fareInfo: "신용",
  productName: [
    "테스트 TEST 상품 정보 ABCDEFG0000 컬러 (COLOR) : 12345BK_블랙",
    "테스트 TEST 상품 정보 ABCDEFG0001 컬러 (COLOR) : 12345TW_화이트",
  ],
  deliveryAddress: "서소문 58-12 대한통운",
  deliveryMessage: "안내문구 삽입",
  deliveryPoint: "중구Bsub",
  deliveryPerson: "홍길동",
  deliveryPointShort: "A01",
  deliveryCode: "K95-3",
};

function App() {
  const [isScan, setIsScan] = useState(false);

  const handleScan = useCallback(async () => {
    function loadingData() {
      console.log("loading complete!!");
    }
    await loadingData();
    setIsScan(true);
    setTimeout(function () {
      // printJS('print', 'html');
      const printEl = document.getElementById("print");
      const tmp = document.body.innerHTML;
      document.body.innerHTML = printEl.innerHTML;
      window.print();
      document.body.innerHTML = tmp;
    }, 100);
  }, [setIsScan]);

  useEffect(() => {
    Jsbarcode("#barcode", mockData.divisionBarcode, {
      width: 1,
      height: 56,
      displayValue: false,
      margin: 0,
    });

    Jsbarcode("#invoice-barcode", mockData.invoiceBarcode, {
      width: 1,
      height: 18,
      displayValue: false,
      margin: 0,
    });

    Jsbarcode("#delivery-barcode", mockData.invoiceBarcode, {
      width: 1,
      height: 41,
      displayValue: true,
      margin: 0,
      fontSize: 10,
    });
  }, []);

  return (
    <div className="app-wrapper">
      {/* {isScan && <PrintPageContainer id="print">test page</PrintPageContainer>} */}
      <div id="print">
        <div className="print-page-container">
          <div className="header-wrapper">
            <div className="invoice-title">운송장번호</div>
            <div className="invoice-text">{mockData.shippingInvoice}</div>
            <div className="order-date-text">{mockData.orderDate}</div>
            <div className="print-page-text">{`${mockData.printPage}/${mockData.printPage}`}</div>
            <div className="reprint-text">{`재출력: ${mockData.reprint}`}</div>
          </div>
          <div className="invoice-wrapper">
            <div className="barcode-wrapper">
              <svg id="barcode" />
            </div>
            <div className="division-code-text">{mockData.divisionCode}</div>
            <div className="delivery-code-text">{mockData.deliveryCode}</div>
          </div>
          <div className="address-wrapper">
            <div className="address-title">받는분</div>
            <div className="address-content-wrapper">
              <div className="address-content-sub">
                <div className="address-content-sub-text">
                  {mockData.receiver.name}
                </div>
                <div className="address-content-phone-number-text">
                  {mockData.receiver.homePhoneNumber}
                </div>
                <div className="address-content-sub-bar">/</div>
                <div className="address-content-sub-text">
                  {mockData.receiver.mobilePhoneNumber}
                </div>
                <div className="invoice-barcode-wrapper">
                  <svg id="invoice-barcode" />
                </div>
              </div>
              <div className="address-content-main">
                {mockData.receiver.address}
              </div>
              <div className="address-content-detail">
                {mockData.receiver.detailAddress}
              </div>
            </div>
          </div>

          <div className="sender-wrapper">
            <div className="sender-name-title">보내는분</div>
            <div className="sender-info-wrapper">
              <div className="sender-info-main">
                <div className="sender-name-text">{mockData.sender.name}</div>
                <div className="sender-phone-number-text">
                  {mockData.sender.mobilePhoneNumber}
                </div>
                <div className="box-info-title">수량</div>
                <div className="box-info-text">{mockData.boxInfo}</div>
                <div className="fare-title">운임</div>
                <div className="fare-text">{mockData.fare}</div>
                <div className="fare-info-title">정산</div>
                <div className="fare-info-text">{mockData.fareInfo}</div>
              </div>
              <div className="sender-info-address-text">
                {mockData.sender.address}
              </div>
            </div>
          </div>

          <div className="product-name-wrapper">
            {mockData.productName.map((name) => (
              <div className="product-name-text" key={name}>
                {name}
              </div>
            ))}
          </div>

          <div className="footer">
            <div className="delivery-info-wrapper">
              <div className="delivery-address-text">
                {mockData.deliveryAddress}
              </div>
              <div className="delivery-message-text">
                {mockData.deliveryMessage}
              </div>
              <div className="delivery-detail-wrapper">
                <div className="delivery-short-text">
                  {`${mockData.deliveryPoint}-${mockData.deliveryPerson}-${mockData.deliveryPointShort}`}
                </div>
                <div className="delivery-detail-fare-title">운임</div>
                <div className="delivery-detail-fare-text">{mockData.fare}</div>
                <div className="delivery-detail-fare-info-title">정산</div>
                <div className="delivery-detail-fare-info-text">
                  {mockData.fareInfo}
                </div>
              </div>
            </div>
            <div className="delivery-barcode-wrapper">
              <svg id="delivery-barcode" />
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleScan}>스캔</button>
    </div>
  );
}

export default App;
