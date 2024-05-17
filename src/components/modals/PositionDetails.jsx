import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ActivitiesHistory from '../displays/ActivitiesHistory';
import { useEffect, useRef, useState } from 'react';

function DataRow({label, value}) {
   return <div className="data-row">
      <div className="data-column label">
         <label>{label}</label>
      </div>
      <div className="data-column value">
         <span>{value}</span>
      </div>
   </div>;
}

export default function PositionDetails({ positionModal, setPositionModal }) {
   const [isHeaderSolid, setIsHeaderSolid] = useState(0);

   function formatMoney(minFrac, maxFrac) {
      return new Intl.NumberFormat('en-US', {
         style: 'currency',
         currency: 'USD',
         // These options are needed to round to whole numbers if that's what you want.
         minimumFractionDigits: minFrac,
         maximumFractionDigits: maxFrac,
      });
   }

   function formatFree(value) {
      return formatMoney().format(value);
   }

   function formatTwo(value) {
      return formatMoney(2, 2).format(value);
   }

   function formatThree(value) {
      return formatMoney(3, 3).format(value);
   }

   const {
      id,
      status,
      positionType,
      type,
      usedLeverege,
      cod,
      interval,
      symbol,
      orders,
      pnl,
      roi,
      openPrice,
      closePrice,
      stopPrice,
      gainPrice,
      initialMargin,
      initialGrossBalance,
      grossBalance,
      isWinner,
      openTime,
      closeTime,
      quantity,
      slotStartAvailableBalance,
      tradeFee,
      usedLeveregeAmount
   } = Object(positionModal);
   let statusDisplay = '';
   let resultDisplay = '---';
   let typeDisplay = '';
   let result;

   if (status === 'opened') {
      statusDisplay = 'Position Opened';
   }

   if (status === 'closed') {
      statusDisplay = 'Position Closed';
   }

   if (isWinner) {
      result = 'gain';
      resultDisplay = 'Gain';
   } else {
      result = 'loss';
      resultDisplay = 'Loss';
   }

   switch (type) {
      case 'position-live': {
         typeDisplay = 'LIVE';
         break;
      }
      case 'position-demo': {
         typeDisplay = 'DEMO';
         break;
      }
   }

   return (
      <Modal
         open={positionModal ? true : false}
         onClose={() => setPositionModal(null)}
         className="position-details transparent-backdrop"
      >
         <div
            className="glass-modal"
            onScroll={(ev) => setIsHeaderSolid(ev.target.scrollTop > 0)}
         >
            <div className={`modal-header ${isHeaderSolid ? 'solid' : ''}`}>
               <h3>
                  <span side-badge={positionType}>{positionType?.toUpperCase()}</span>
                  {symbol} ({interval})</h3>

               <IconButton onClick={() => setPositionModal(null)}>
                  <CloseIcon />
               </IconButton>
            </div>

            <div className="modal-body">
               <section className="content-sidebar">
                  <div className="content">
                     <div className="results-wrap">
                        <div className="value-wrap">
                           <label>PNL</label>
                           <span txt-result={result}>{formatThree(pnl)}</span>
                        </div>
                        <div className="value-wrap">
                           <label>ROI</label>
                           <span txt-result={result}>{roi?.toFixed(2)}%</span>
                        </div>
                        <div className="value-wrap">
                           <label>Open Price</label>
                           <span>{formatFree(openPrice)}</span>
                        </div>
                        <div className="value-wrap">
                           <label>Close Price</label>
                           <span>{closePrice ? formatFree(closePrice) : '---'}</span>
                        </div>
                        <div className="value-wrap">
                           <label>Stop Loss</label>
                           <span>{formatFree(stopPrice)}</span>
                        </div>
                        <div className="value-wrap">
                           <label>Take Profit</label>
                           <span>{gainPrice ? formatFree(gainPrice) : '---'}</span>
                        </div>
                        <div className="value-wrap">
                           <label>Intial Margin</label>
                           <span>{formatTwo(initialMargin)}</span>
                        </div>
                        <div className="value-wrap">
                           <label>Intial Notional</label>
                           <span>{formatTwo(initialGrossBalance)}</span>
                        </div>
                     </div>

                     <div className="datails-wrap">
                        <div>
                           <div className="modal-header">
                              <h3>Details</h3>
                           </div>

                           <div className="details-data">
                              <DataRow label="COD" value={cod} />
                              <DataRow label="Open Time" value={new Date(openTime).toLocaleString()} />
                              <DataRow label="Close Time" value={new Date(closeTime).toLocaleString()} />
                              <DataRow label="Notional" value={formatTwo(grossBalance)} />
                              <DataRow label="Commission" value={formatThree(tradeFee)} />
                              <DataRow label="Slot Interval" value={interval} />
                              <DataRow label="Slot's Intial Available Balance" value={formatTwo(slotStartAvailableBalance)} />
                              <DataRow label="Used Leverage Amount" value={formatThree(usedLeveregeAmount)} />
                           </div>
                        </div>
                        <div>
                           <div className="modal-header">
                              <h3>Orders</h3>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="sidebar">
                     <div className="status-wrap">
                        <span className="status-display" status={status}>{statusDisplay || status}</span>
                     </div>

                     {closePrice ? <div className="status-wrap">
                        <span className="status-display" bg-result={result}>{resultDisplay}</span>
                     </div> : ''}

                     <div className="results-wrap">
                        <div className="value-wrap">
                           <label>Type</label>
                           <span>{typeDisplay}</span>
                        </div>
                        <div className="value-wrap">
                           <label>Leverage</label>
                           <span>{usedLeverege}x</span>
                        </div>
                        <div className="value-wrap">
                           <label>Quantity</label>
                           <span>{quantity}</span>
                        </div>
                     </div>

                     <div className="modal-header">
                        <h3>Actitivies History</h3>
                     </div>
                     <ActivitiesHistory customTitle="Position History" disableTitle={true} positionUID={id} />
                  </div>
               </section>

               {orders?.length ? <section className="order-wrap">
                  <div className="modal-header">
                     <h3>All Position Orders</h3>
                  </div>

                  {orders?.map(order => {
                     const modifiedAt = new Date(order.modifiedAt);
                     return (<Accordion key={order.orderId}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                           [{modifiedAt.toLocaleDateString()} {modifiedAt.toLocaleTimeString()}] [{order.origType}] {order.side} - {order.status}
                        </AccordionSummary>
                        <AccordionDetails>
                           fdsffsdfd
                        </AccordionDetails>
                     </Accordion>);
                  })}
               </section> : ''}
            </div>
         </div>
      </Modal>
   );
}
