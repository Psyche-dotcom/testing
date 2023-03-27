// import clsx from "clsx";
// import { useEffect, useRef, useState } from "react";
// import Styles from "./test.module.scss";

// export default function test() {
//   const [show, setShow] = useState(false);
//   const ref = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           entry.target.classList.toggle(`${Styles.show}`, entry.isIntersecting);
//         });
//       },
//       {
//         threshold: 0.5,
//       }
//     );
//     if (ref.current) {
//       ref.current.childNodes.forEach((item) => {
//         observer.observe(item);
//       });
//     }
//   }, [ref, show]);

//   return (
//     <div style={{ margin: "30px 0" }}>
//       <button
//         onClick={() => setShow(!show)}
//         style={{
//           border: "1px solid white",
//           padding: "50px 100px",
//           margin: "20px",
//           color: "white",
//         }}
//       >
//         Show
//       </button>

//       {show && (
//         <div
//           style={{ color: "white", paddingBottom: "30px", transition: "150ms" }}
//           ref={ref}
//         >
//           {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
//             (item, index) => (
//               <h1 key={index} className={clsx(Styles.card)}>
//                 Hello-{item}
//               </h1>
//             )
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

//put your section here
export default function () {
  return "Hello World!"
}