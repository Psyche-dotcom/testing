import { gql } from "@apollo/client";

export const SET_SECURED_IMAGE = gql`
  mutation SetSecuredImage($token: String!, $page: String!, $uri: String! ) {
    setSecuredImage(token: $token, page: $page, uri: $uri) {
      succeeded
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser(
    $email: String!
    $password: String!
    $username: String!
    $account_type: String!
  ) {
    register(
      input: {
        email: $email
        password: $password
        username: $username
        account_type: $account_type
      }
    ) {
      id
      username
      email
    }
  }
`;

export const REMOVE_PAGE = gql`
mutation RemovePage($token: String!, $page: String!) {
  removePage(token: $token, page: $page) {
    succeeded
    message
  }
}
`

export const UPDATE_PAGE_NAME = gql`
  mutation UpdatePageName($token: String!, $page: String!, $name: String!) {
  updatePageName(token: $token, page: $page, name: $name) {
    message
    succeeded
  }
}
`

export const SET_PAGE_SECURITY_STATE = gql`
  mutation SetSecurityState($token: String!, $page: String!, $secured:Boolean!) {
  setPageSecurityState(token:$token, page: $page, secured: $secured) {
    succeeded
    message
  }
}
`

export const SEND_EMAIL_INVITATION = gql`
  mutation sendEmailInvitation($email:String!, $pageId:String!) {
  sendPasscodeRequestToEmail(email: $email, pageId: $pageId) {
    succeeded
    message
  }
  }
`
export const SET_PAGE_INVITE_Duration = gql`
    mutation setPageInviteDuration($token: String!,$duration: String!, $vreelId: String ) {
    setPageInviteDuration(token: $token, duration: $duration, vreelId:$vreelId) {
      succeeded
      message
    }
  }
`

export const REMOVE_PAGE_INVITE = gql`
  mutation RemovePageInvite($token:String!, $pageId:String!, $inviteId:String!) {
    removePageInvite(token: $token, pageId: $pageId, inviteId:$inviteId) {
      message
      succeeded
    }
  }
`

export const SET_PAGE_PASSWORD = gql`
  mutation SetPagePassword($token:String!, $vreelId:String, $password:String!) {
    setPagePassword(token:$token, vreelId: $vreelId, password: $password) {
      message
      succeeded
    }
  }
`

export const SEND_PAGE_INVITE = gql`
  mutation sendInvite($token:String!, $email:String!, $vreelId: String) {
    sendPageInvite(token: $token, email: $email, vreelId: $vreelId) {
      message
      succeeded
    }
  }
`

export const CREATE_COLLABORATION_REQUEST = gql`
  mutation CreateCollabRequest($token:String!, $input: CollaborationRequestInput! ) {
  createCollabRequest(token: $token, input: $input ) {
    succeeded
    message
  }
}
`

export const CANCEL_COLLABORATION_REQUEST = gql`
    mutation CancelCollabRequest($token: String!, $collabId:String! ) {
    cancelCollabRequest(token:$token, collabId: $collabId) {
      message
      succeeded
    }
  }
`


export const SET_EMPLOYEES_MEMBERS_ELEMENT = gql`
  mutation SetEmployeesInMembersElement($token: String!, $employee: [String!]!, $sectionId: String!) {
    setEmployeesInMembersElement(token: $token, employee: $employee, sectionId: $sectionId) {
      message
      succeeded
    }
  }
`
export const SET_COLLABORATION_REQUEST_STATUS = gql`
  mutation UpdateCollabRequestStatus($token:String!, $collabId:String!, $status:String!) {
    updateCollabRequestStatus(token: $token, collabId:$collabId, status: $status ) {
      succeeded
      message
    }
  }
`

export const PLACE_COLLAB_SLIDE = gql`
  mutation PlaceSlide($token:String!, $input: PlaceSlideCollabRequestInput!) {
    placeSlideCollabRequest(token:$token, input: $input) {
      succeeded
      message
    }
  }
`


export const ACCEPT_COLLABORATION_REQUEST = gql`
  mutation AcceptCollabRequest($token:String!, $requestId:String!) {
    acceptCollabRequest(token:$token, requestId: $requestId  ) {
      message
      succeeded
    }
  }
`


export const DELETE_MEMBERS_ELEMENT = gql`
  mutation DeleteMembersElement($token: String!, $id: String!) {
  deleteMembersElement(token: $token, id: $id) {
    succeeded
    message
  }
}
`

export const REMOVE_EMPLOYEES_FROM_MEMBERS_ELEMENT = gql`
  mutation RemoveEmployeesFromMembersElement($token: String!, $employee: [String!]!, $sectionId: String!) {
  removeEmployeesFromMembersElement(token: $token, employee: $employee, sectionId: $sectionId) {
    message
    succeeded
  }
}
`


export const registerUser = async (username: string, email: string, password: string, accout_type: string) => {

}

export const CREATE_MEMBERS_ELEMENT = gql`
  mutation CreateMembersElement($token: String!, $vreelId: String) {
    createMembersElement(token: $token, vreelId: $vreelId) {
      message
      succeeded
    }
  }
`

export const CREATE_SLIDE = gql`
mutation CreateSlide($token: String!, $vreelId: String) {
    createSlide(token: $token, vreelId: $vreelId) {
      id
      author
    }
  }

`

export const UPDATE_USER = gql`
  mutation updateUser($token: String!,$fields: [VreelFields!] ) {
    updateUser(token: $token, fields: $fields){
  message
  succeeded
}
  }
`

export const UPDATE_EMPLOYEE = gql`
  mutation updateEmployee($token: String!,$employee: String!, $fields: [VreelFields!] ) {
    updateEmployee(token: $token, fields: $fields, employee: $employee){
      message
      succeeded
}
  }
`

export const ADD_EMPLOYEE_TO_ENTERPRISE = gql`
  mutation addEmployee($token: String!, $input: NewUser! ) {
    addEmployeeToEnterprise(token: $token, newUser: $input) {
      id
    }
  }
`

export const REMOVE_EMPLOYEE_FROM_ENTERPRISE = gql`
  mutation removeEmployee($token: String!, $employee: String!) {
    removeEmployeeFromEnterprise(token: $token, employee: $employee ) {
      message
      succeeded
    }
  }
`

export const UPDATE_VREEL_FIELDS = gql`
  mutation updateVreelFields($token: String!, $fields: [VreelFields!]!, $vreelId: String) {
    updateVreelFields(token: $token, fields: $fields, vreelId: $vreelId) {
      message 
      succeeded
    }
  }
`

export const CREATE_PAGE = gql`
  mutation addPage($token: String!, $name: String!) {
    addPage(token: $token, name: $name) {
      message
      succeeded
    }
  }
`

export const UPDATE_ELEMENT_BACKGROUND_COLOR = gql`
  mutation editBackgroundColor($token: String!, $elementId: String!, $elementType: String!, $backgroundColor: String!) {
	editElementBackgroundColor(token: $token
  	elementId: $elementId,
    elementType:$elementType
    backgroundColor: $backgroundColor
  )  {
    succeeded
    message
  }
}
`

export const UPDATE_ENTERPRISE_MUTATION = gql`
mutation UpdateEnterprise($token: String!, $input: EnterpriseInput!) {
  updateEnterprise(token: $token, input: $input) {
    message
    succeeded
  }
}
`
export const UPDATE_EMPLOYEE_METATDATA = gql` 
  mutation UpdateEmployeeMetadata($token: String!, $input: EmployeeMetadataInput, $employeeId: String!) {
  updateEmployeeMetadata(token: $token, input: $input, employeeId: $employeeId) {
    message
    succeeded
  }
}
`
export const SET_SECTION_VISIBILITY = gql`
  mutation SetSectionVisibility($token: String!, $hidden: Boolean!, $sectionId: String!, $sectionType: String!) {
    setSectionVisibility(token: $token, hidden: $hidden, sectionId: $sectionId, sectionType: $sectionType) {
      message
      succeeded
    }
  }
`