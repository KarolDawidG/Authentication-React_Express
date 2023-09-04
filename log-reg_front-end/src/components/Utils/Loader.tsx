
export const Loader = () => {
  return <>
    <div>
      <h1>Loading...</h1>
    </div>;
  </>
}
// There was an issue with react-spinners, so I decided to comment out those lines of code.


// import {FadeLoader} from "react-spinners/";

// export const Loader = () => {
//   return <>
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <FadeLoader
//             color="#e30937"
//             height={30}
//             loading
//             margin={6}
//             radius={3}
//             speedMultiplier={1}
//             width={4}
//         />
//     </div>;
//   </>
// }
