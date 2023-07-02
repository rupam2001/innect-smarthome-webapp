import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import InAppLayout from "../layouts/InAppLayout";
import { GlobalContext } from "../context/context";
import { Button, Input } from "@material-tailwind/react";

import {
  CopyAll,
  MarkChatRead,
  MarkChatReadRounded,
  Wifi,
  Wifi1Bar,
} from "@mui/icons-material";
import { hidePassword } from "../utils/helpers";
import { ESPENDPOINT } from "../constants";
import { GetNetworks } from "../utils/storage.";

import {
  List,
  ListItem,
  ListItemSuffix,
  Card,
  IconButton,
} from "@material-tailwind/react";
import { TrashIcon, WifiIcon } from "@heroicons/react/24/solid";

export default function WifiScreen() {
  const [searchParams] = useSearchParams();
  const globalContext = useContext(GlobalContext);
  const [deviceName, setDeviceName] = useState(null);
  const [devicePassword, setDevicePassword] = useState(null);
  const [connected, setConnected] = useState(false);
  const [copied, setCopied] = useState(false);
  const [wificonnected, setWifiConnected] = useState(false);
  const [typedSSID, setTypedSSID] = useState(null);
  const [typedPassword, setTypedPasword] = useState(null);

  const checkConnectionAsync = async () => {
    try {
      const res = await fetch(ESPENDPOINT + "/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      setConnected(true);
      console.log("connected");
    } catch (error) {
      console.log("error connecting");
    }
    console.log("checking..");
  };
  useEffect(() => {
    const t = setInterval(() => {
      !connected && checkConnectionAsync();
    }, 1000);
    return () => clearInterval(t);
  }, []);

  //get the current device's details
  useEffect(() => {
    if (!globalContext.devices) return;
    const _id = searchParams.get("device_id");
    const device = [...globalContext.devices].find((v) => v._id == _id);
    if (!device) {
      console.log("not found");
      return;
    }
    setDeviceName(device.name);
    setDevicePassword(device.wifipassword);
  }, [globalContext]);

  const onClickCopy = () => {
    navigator.clipboard
      .writeText(devicePassword)
      .then(() => {
        setCopied(true);
        alert("copied");
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  const onClickConnect = async () => {
    //
    try {
      const res = await fetch(
        "http://" +
          ESPENDPOINT +
          `/setwifisettings?ssid=${typedSSID}&pwd=${typedPassword}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      ).then((r) => r.json());
      setWifiConnected(true);
    } catch (error) {}
  };

  if (connected) {
    return (
      <div className="p-2 bg-gray-100 h-screen">
        <div className="py-2">
          <h1 className="text-2xl">Connect Device to Wifi</h1>
        </div>
        <div className="bg-white p-4 py-8 rounded-md flex flex-col w-full  gap-12 mt-4">
          <Input
            variant="static"
            label="Network name"
            placeholder="Enter network name"
            onChange={(e) => setTypedSSID(e.target.value)}
          />
          <Input
            variant="static"
            label="Password"
            placeholder="Enter password"
            type="password"
            onChange={(e) => setTypedPasword(e.target.value)}
          />
        </div>
        <div className="w-full flex justify-center mt-8 mb-8 items-center">
          <Button onClick={onClickConnect}>Connect</Button>
        </div>
        <div className="w-full">
          <div>Saved networks:</div>
          <div className="bg-white p-4 py-8 rounded-md flex flex-col w-full mt-2">
            {GetNetworks() === {} && <div>No saved networks</div>}
            <List>
              {Object.keys(GetNetworks()).map((ssid) => (
                <ListItem ripple={false} className="py-1 pr-1 pl-4">
                  {ssid}
                  <ListItemSuffix>
                    <IconButton variant="text" color="blue-gray">
                      <WifiIcon className="h-5 w-5" />
                    </IconButton>
                  </ListItemSuffix>
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      </div>
    );
  }

  if (!connected)
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center text-xl font-bold pb-20">
        {!connected && (
          <div className="animate-pulse">
            <Wifi style={{ fontSize: "12rem" }} />
          </div>
        )}
        {deviceName}
        <div
          className="h-fit p-2 w-full my-8 flex justify-center "
          onClick={onClickCopy}
        >
          {devicePassword && hidePassword(devicePassword)}
          {!copied && <CopyAll style={{ marginLeft: "0.5rem" }} />}
          {copied && <MarkChatRead style={{ marginLeft: "0.5rem" }} />}
        </div>
        <div className="text-sm break-words break-all max-w-full pt-20  p-6">
          <h2 className="mb-2  font-semibold text-sky-400 dark:text-white">
            Steps: (Do not close the App)
          </h2>
          <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 ">
            <li>
              Copy the password by clicking at{" "}
              {<CopyAll style={{ marginLeft: "0.5rem", fontSize: "1.2rem" }} />}
            </li>
            <li>
              Connect to the wifi{" "}
              <i className="text-sky-600">{` "${deviceName}" `}</i>
              by pasting the password to your device's wifi network settings
            </li>
            <li>Then comeback to this page.</li>
          </ul>
        </div>
      </div>
    );
}
