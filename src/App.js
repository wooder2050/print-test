import { useState, useCallback, useEffect } from "react";
import printJS from "print-js";
import styled from "styled-components";
import Jsbarcode from "jsbarcode";

const mockData = {
  shippingInvoice: "1234 - 1234 - 5678",
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
};

function App() {
  const [isScan, setIsScan] = useState(false);

  const handleScan = useCallback(async () => {
    function loadingData() {
      console.log("loading complete!!");
    }
    await loadingData();
    setIsScan(true);
    printJS("print", "html");
  }, [setIsScan]);

  useEffect(() => {
    Jsbarcode("#barcode", mockData.invoiceBarcode, {
      width: 2,
      height: 40,
      displayValue: false,
    });
  }, []);

  return (
    <AppWrapper>
      {/* {isScan && <PrintPageContainer id="print">test page</PrintPageContainer>} */}
      <PrintPageContainer id="print">
        <HeaderWrapper>
          <InvoiceTitle>운송장번호</InvoiceTitle>
        </HeaderWrapper>
        <BarCodeWrapper>
          <BarCode id="barcode" />
        </BarCodeWrapper>
      </PrintPageContainer>
      <button onClick={handleScan}>스캔</button>
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  padding: 10px;
`;

const PrintPageContainer = styled.div`
  width: 123mm;
  height: 100mm;
  border-radius: 10px;
  border: 1px solid rgb(240, 194, 197);
  margin-bottom: 20px;
`;

const HeaderWrapper = styled.div`
  margin: 1mm;
  height: 8mm;
  width: 98%;
  border-top: 3px solid rgb(82, 160, 227);
  border-left: 3px solid rgb(82, 160, 227);
  border-bottom: 2px solid rgb(82, 160, 227);
  display: flex;
  align-items: center;
`;

const InvoiceTitle = styled.div`
  color: rgb(82, 160, 227);
  font-size: 10px;
  font-weight: bold;
  margin-left: 1px;
`;

const BarCodeWrapper = styled.div`
  width: 98%;
  height: 15mm;
`;

const BarCode = styled.svg``;
