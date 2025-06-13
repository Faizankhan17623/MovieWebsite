const BASE_URL = import.meta.env.VITE_MAIN_BACKEND_URL_ORG

export const CreateOrgainezer = {
    CreateOrgainezer:BASE_URL+"/Create-Orgainezer",
    OrgainezerLogin:BASE_URL+"/Orgainezer-login",
}

export const Ticket = {
    CreateTicket:BASE_URL+"/Create-Ticket"
}

export const AllotTheatre = {
    AllotTheatre:BASE_URL+"/Allot-Theatre",
}


export const GetAllSHowsDetails = { 
    GetAllShowsDetails:BASE_URL+"/All-Shows"
}

export const GetAllTheatreDetails = {
    GetAllTheatreDetails:BASE_URL+"/Get-All-Theatre-Details"
}
