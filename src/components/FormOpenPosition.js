import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import { SubmitPosition } from '../config/api';
import axios from "axios";
import OpenPositionSuccess from './OpenPositionSuccess'
import { useState, useEffect } from "react";

const assets = [
    {
        value: 'ETH/USD',
        label: 'ETH/USD',
    }
];

const sides = [
    {
        value: 'Buy',
        label: 'Buy',
    },
    {
        value: 'Sell',
        label: 'Sell',
    },
];

const markets = [
    {
        value: '68',
        label: 'Coinbase',
    },
    {
        value: '61123',
        label: 'Binance-US',
    },
];

function FormOpenPosition() {
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [unrealizedPL, setUnrealizedPL] = useState();
    const [asset, setAsset] = useState('ETH/USD');
    const [side, setSide] = useState('Buy');
    const [size, setSize] = useState();
    const [leverage, setLeverage] = useState();
    const [marketID, setMarketID] = useState('68');

    const onChangeAsset = (event) => {
        setAsset(event.target.value);
    };

    const onChangeSide = (event) => {
        setSide(event.target.value);
    };

    const onChangeSize = (event) => {
        setSize(event.target.value);
    };

    const onChangeLeverage = (event) => {
        setLeverage(event.target.value);
    };

    const onChangeMarketID = (event) => {
        setMarketID(+event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        const position = {
            user_id: 1,
            asset: asset,
            side: side,
            size: +size,
            leverage: +leverage,
            market_id: +marketID,
            status: 1,
            entry_price: 1529
        }
        const res = await axios.post(SubmitPosition, { position })

        setOpen(false);
        setSuccess(true);
        setUnrealizedPL(res.data.unrealized_pnl)
    };

    useEffect(() => { }, [success]);

    if (success) {
        return <OpenPositionSuccess unrealized_pnl={unrealizedPL} />
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open synthetic position
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Open synthetic position</DialogTitle>
                <DialogContent>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Asset"
                        defaultValue="ETH/USD"
                        helperText="Please select asset"
                        onChange={onChangeAsset}
                    >
                        {assets.map((option) => (
                            <MenuItem key={option.value} value={option.value} disable>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        margin="dense"
                        id="size"
                        label="Size"
                        fullWidth
                        variant="standard"
                        onChange={onChangeSize}
                    />

                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Side"
                        defaultValue="Buy"
                        helperText="Please select side"
                        onChange={onChangeSide}
                    >
                        {sides.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        margin="dense"
                        id="Leverage"
                        label="Leverage"
                        fullWidth
                        variant="standard"
                        onChange={onChangeLeverage}
                    />

                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Market"
                        defaultValue='68'
                        helperText="Please select market"
                        onChange={onChangeMarketID}
                    >
                        {markets.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Open</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default FormOpenPosition;