import { useState, useCallback, useEffect } from 'react';
import printJS from 'print-js';
import styled from 'styled-components';
import Jsbarcode from 'jsbarcode';
import './App.css';

const mockData = {
  shippingInvoice: '1234 - 1234 - 5678',
  orderDate: '2020.01.01',
  printPage: 1,
  reprint: 2,
  divisionBarcode: 1234,
  divisionCode: 8,
  receiver: {
    name: '홍길동',
    homePhoneNumber: '02-1234-5678',
    mobilePhoneNumber: '010-1234-5678',
    address:
      '서울 중구 세종대로9길 53 [서소문동 58-12] 홍길동아파트 101동 201호',
    detailAddress: '홍길동아파트 101동 201호',
  },
  invoiceBarcode: 123412345678,
  sender: {
    name: '송화인',
    homePhoneNumber: '02-2468-0246',
    mobilePhoneNumber: '010-2468-0246',
    address: '서울 중구 태종대로9길 53 [서소문동 58-12]',
    detailAddress: '홍길동아파트 102동 301호',
  },
  boxInfo: '극소 B 1',
  fare: 0,
  fareInfo: '신용',
  productName: [
    '테스트 TEST 상품 정보 ABCDEFG0000 컬러 (COLOR) : 12345BK_블랙',
    '테스트 TEST 상품 정보 ABCDEFG0001 컬러 (COLOR) : 12345TW_화이트',
  ],
  deliveryAddress: '서소문 58-12 대한통운',
  deliveryMessage: '안내문구 삽입',
  deliveryPoint: '중구Bsub',
  deliveryPerson: '홍길동',
  deliveryPointShort: 'A01',
};

function App() {
  const [isScan, setIsScan] = useState(false);

  const handleScan = useCallback(async () => {
    function loadingData() {
      console.log('loading complete!!');
    }
    await loadingData();
    setIsScan(true);
    setTimeout(function () {
      // printJS('print', 'html');
      const printEl = document.getElementById('print');
      const tmp = document.body.innerHTML;
      document.body.innerHTML = printEl.innerHTML;
      window.print();
      document.body.innerHTML = tmp;
    }, 100);
  }, [setIsScan]);

  useEffect(() => {
    Jsbarcode('#barcode', mockData.invoiceBarcode, {
      width: 2,
      height: 40,
      displayValue: false,
    });
  }, []);

  return (
    <div class='app-wrapper'>
      {/* {isScan && <PrintPageContainer id="print">test page</PrintPageContainer>} */}
      <div id='print'>
        <div class='print-page-container'>
          <div class='header-wrapper'>
            <div class='invoice-title'>운송장번호</div>
          </div>
          <div class='barcode-wrapper'>
            <svg id='barcode' />
          </div>
        </div>
      </div>
      <button onClick={handleScan}>스캔</button>
    </div>
  );
}

export default App;
