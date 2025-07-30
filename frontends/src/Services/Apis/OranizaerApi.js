const BASE_URL = import.meta.env.VITE_MAIN_BACKEND_URL_ORG

export const CreateOrgainezer = {
    createorgainezer:BASE_URL+"/Create-Orgainezer",
    orgainezerlogin:BASE_URL+"/Orgainezer-login",
}

export const Ticket = {
    CreateTicket:BASE_URL+"/Create-Ticket"
}

export const AllotTheatre = {
    Allotheatre:BASE_URL+"/Allot-Theatre",
}


export const GetAllSHowsDetails = { 
    Getallshowsdetails:BASE_URL+"/All-Shows"
}

export const GetAllTheatreDetails = {
    Getalltheatredetails:BASE_URL+"/Get-All-Theatre-Details"
}
