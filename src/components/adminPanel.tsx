import * as React from "react";
import { useFlags } from "launchdarkly-react-client-sdk";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Table } from "@nextui-org/react";
import product from "@/config/products";


type inventory = {
    id: number;
    toggle_name: string;
    price: string;
    description: string;
  };
  
  type orders = {
    name: string;
    email: string;
  };
  
  type product = {
    name: string;
    table_price: string;
    inventory: number;
  };

export default function AdminPanel() {
    const { adminMode, dbTesting } = useFlags();

  const [inventory, setInventory] = React.useState<any>([]);

  const getInventory = async () => {
    try {
      const response = await fetch("/api/inventory");
      const jsonData = await response.json();
      setInventory(jsonData);
    } catch (error) {
      console.log("there was an error");
    }
  };

  React.useEffect(() => {
    getInventory();
    getOrders();
  }, [dbTesting]);

  function initialize() {
    getInventory();
    getOrders();
  }

  const [orders, setOrders] = React.useState<any>([]);
  const getOrders = async () => {
    try {
      const response = await fetch("/api/form");
      const jsonData = await response.json();
      setOrders(jsonData);
    } catch (error) {
      console.log("there was an error");
    }
  };
  return (
    <Dialog>
        {adminMode && 
      <DialogTrigger asChild>
        <Button onClick={(e) => initialize()} className="text-xl bg-red-400 hover:bg-red-400/90 text-white" variant="outline">Store Admin</Button>
      </DialogTrigger>
      }
      <DialogContent className="min-w-[80%] h-4/5">
        <DialogHeader>
          <DialogTitle>Administrative Inventory</DialogTitle>
          <DialogDescription>
            Running count of current inventory and requests.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-auto">
        {dbTesting == "postgres" ? (
        <Table
          css={{
            backgroundColor: "white",
            alignContent: "right",
          }}
          selectionMode="single"
        >
          <Table.Header>
            <Table.Column>TOGGLE NAME</Table.Column>
            <Table.Column>PRICE</Table.Column>
            <Table.Column>DESCRIPTION</Table.Column>
            <Table.Column>CURRENT INVENTORY</Table.Column>
            <Table.Column>OUTSTANDING ORDERS</Table.Column>
          </Table.Header>
          <Table.Body>
            {inventory.map((inventory: inventory) => (
              <Table.Row key="1">
                <Table.Cell>{inventory.toggle_name}</Table.Cell>
                <Table.Cell>{inventory.price}</Table.Cell>
                <Table.Cell>{inventory.description}</Table.Cell>
                <Table.Cell>{Math.floor(Math.random() * 100)}</Table.Cell>
                <Table.Cell>{Math.floor(Math.random() * 10)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>):(
          <Table
            css={{
              backgroundColor: "white",
              alignContent: "center",
            }}
            selectionMode="single"
          >
            <Table.Header>
              <Table.Column>TOGGLE NAME</Table.Column>
              <Table.Column>PRICE</Table.Column>
              <Table.Column>CURRENT INVENTORY</Table.Column>
            </Table.Header>
            <Table.Body>
              {product.map((product: product) => (
                <Table.Row key="1">
                  <Table.Cell>{product.name}</Table.Cell>
                  <Table.Cell>{product.table_price}</Table.Cell>
                  <Table.Cell>{product.inventory}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
        </div>
        <DialogHeader>
          <DialogTitle>Order Submissions</DialogTitle>
          <DialogDescription>
            Requested contacts from submissions.
          </DialogDescription>
        </DialogHeader>
        <Table
          css={{
            backgroundColor: "white",
            alignContent: "center",
          }}
          selectionMode="single"
        >
          <Table.Header>
            <Table.Column>NAME</Table.Column>
            <Table.Column>EMAIL</Table.Column>
          </Table.Header>
          <Table.Body>
            {orders.map((orders: orders) => (
              <Table.Row key="1">
                <Table.Cell>{orders.name}</Table.Cell>
                <Table.Cell>{orders.email}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
