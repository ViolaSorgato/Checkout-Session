// import { ShoppingTwoTone } from "@ant-design/icons";
// import { useState } from "react";
// import { Button, Drawer, Space } from "antd";
// import CheckoutBtn from "../CheckoutBtn/CheckoutBtn";

// export default function ShoppingCartIcon() {
//   const [open, setOpen] = useState(false);

//   const showDrawer = () => {
//     setOpen(true);
//   };
//   const onClose = () => {
//     setOpen(false);
//   };

//   return (
//     <>
//       <ShoppingTwoTone
//         className="ShoppincartIcon"
//         twoToneColor="#7E66F9"
//         onClick={showDrawer}
//       ></ShoppingTwoTone>
//       <Drawer
//         title="Your cart"
//         width={500}
//         open={open}
//         onClose={onClose}
//         extra={
//           <Space>
//             <Button onClick={onClose}>Cancel</Button>
//           </Space>
//         }
//       >
//         <p>Some contents...</p>
//         <p>Some contents...</p>
//         <p>Some contents...</p>
//       </Drawer>
//       <CheckoutBtn />
//     </>
//   );
// }
