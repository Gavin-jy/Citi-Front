import React from "react"
import SummaryItem from './summaryItem'

export default function Table(props) {
    const tableData = props.tableData?.value || []
    console.log(tableData)
    const summary = props.tableData || {}

    return <div className="data-table">
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Client Name</th>
                    <th>Client Side</th>
                    <th>Ticker</th>
                    <th>RIC</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th>Notional USD</th>
                    <th>Currency</th>
                    <th>Issuer Sector</th>
                    <th>Salesperson</th>
                    <th>HT/PT</th>
                </tr>
            </thead>
            <tbody>
                {
                    tableData.map((item, index) => {
                        return <tr key={index}>
                            <td>{item.date}</td>
                            <td>{item.clientName}</td>
                            <td>{item.clientSide}</td>
                            <td>{item.ticker}</td>
                            <td>{item.ric}</td>
                            <td>{item.size}</td>
                            <td>{item.price}</td>
                            <td>{item.notional} USD</td>
                            <td>{item.currency}</td>
                            <td>{item.sector}</td>
                            <td>{item.salesperson}</td>
                            <td>{item.hp}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
        <div className="data-summary">
            <div className="summary-items">
                <SummaryItem label="Total Buy" value={summary.totalBuy} className='total-buy' />
                <SummaryItem label="Total Sell" value={summary.totalSell} className='total-sell' />
                <SummaryItem label="Net Quantity" value={summary.quantity} className='net-quantity' />
                <SummaryItem label="Total Buy Notional" value={summary.buyNotional} className='total-buy-notional' />
                <SummaryItem label="Total Sell Notional" value={summary.sellNotional} className='total-sell-notional' />
                <SummaryItem label="Net Notional" value={summary.netNotional} className='net-notional' />
                <SummaryItem label="Total Records" value={tableData.length} className='records' />
            </div>

        </div>
    </div>
}