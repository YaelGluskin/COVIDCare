import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';
import DashLayout from './dash/DashLayout';
import Welcom from './features/auth/Welcome';
import UsersList from './features/users/UsersList';
import ClientsList from './features/clients/ClientsList';
import VaccineList from './features/vaccine/VaccinesList';
import DiseaseList from './features/disease/DiseasesList';
import EditUser from './features/users/EditUser';
import NewUser from './features/users/NewUser';
import EditClient from './features/clients/EditClient';
import NewClient from './features/clients/NewClient';
import EditVaccine from './features/vaccine/EditVaccine';
import NewVaccineForm from './features/vaccine/NewVaccineForm';
import EditDisease from './features/disease/EditDisease';
import ClientData from './features/clients/ClientData'
import Prefetch from './features/auth/PreFatch';
import NewDiseaseForm from './features/disease/NewDiseaseForm';
import PersistLogin from './features/auth/PersistLogin';
import { ROLES } from './config/roles'; 
import RequireAuth from './features/auth/RequireAuth';
import useTitle from './hooks/useTitle';

function App() {
  useTitle('CovidCare')
  return (
    <Routes>
      
      <Route exact path="/" element = {<Layout/>}/>
      {/* 2 public routes */}
      <Route index element={<Public/>} />
      <Route path = "login" element={<Login/>}/>

      {/*  protected routes */}
      <Route element={<PersistLogin/>}>
        <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]}/>}>
          <Route element={<Prefetch/>}>

            <Route path = "dash" element={<DashLayout />} >
              <Route index element={<Welcom />} />
              

              <Route path="clients">
                <Route index element={<ClientsList />} />
                <Route path=':id/' element={<ClientData />} />
                <Route path=':id/edit' element={<EditClient />} />
                <Route path=':id/newDis' element={<NewDiseaseForm />} />
                <Route path=':id/newVac' element={<NewVaccineForm />} />

                <Route path='new' element={<NewClient />} />
              </Route>

              <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Manager]}/>}>
                <Route path="users">
                  <Route index element={<UsersList />} />
                  <Route path=':id' element={<EditUser />} />
                  <Route path='new' element={<NewUser />} />
                  
                </Route>
              </Route>

              <Route path="vaccines">
                <Route index element={<VaccineList />} />
                <Route path=':id' element={<EditVaccine />} />
              </Route>

              <Route path="diseases">
                <Route index element={<DiseaseList />} />
                <Route path=':id' element={<EditDisease />} />
                
              </Route> {/**end dash */}

            </Route> {/**end outer */}
          </Route>  {/**end Prefetch */}
        </Route>  {/**end Allou */}
      </Route> {/**end PersistLogin */}
    </Routes>
  );
}

export default App;
