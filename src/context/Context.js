import React, {createContext,useState} from 'react'

const UserContext = createContext()

export const UserContextProvider = (props) => {
    const [userID, setUserID] = useState(0)
    const [showFloatingAlert, setShowFloatingAlert] = useState(false)
    const [refreshArtikelCollections, setRefreshArtikelCollections] = useState(false)

    return (
        <UserContext.Provider value={{
            userID,
            setUserID,
            showFloatingAlert,
            setShowFloatingAlert,
            refreshArtikelCollections,
            setRefreshArtikelCollections
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext
// *====================================


// const RootContext = createContext()

///Provider
// const Provider = RootContext.Provider
// const GlobalProvider = (Children, props) => {

//     return (
//         class ParentComponent extends Component {
//             state = {
//                 id: 0
//             }

//             dispatch = (action) => {
//                 if (action > 0) {
//                     return this.setState(
//                         {
//                             id: action
//                         }
//                     )
//                 }
//             }

//             render() {
//                 return (
//                     <Provider value={
//                         {
//                             state: this.state,
//                             dispatch: this.dispatch
//                         }
//                     }>
//                         <div>
//                             <Children {...this.props} />
//                         </div>
//                     </Provider>
//                 )
//             }
//         }
//     )
// }
// export default GlobalProvider

// Consumer
// const Consumer = RootContext.Consumer
// export const GlobalConsumer = (Children, props) => {

//     return (
//         class ParentComponent extends Component {
//             render() {
//                 return (
//                     <Consumer>
//                         {
//                             value => {
//                                 return(
//                                     <Children {...this.props} {...value}/>
//                                 )
//                             }
//                         }
//                     </Consumer>
//                 )
//             }
//         }
//     )
// }

