import Layout from '../components/Layout/Layout'
import CardSetting from '../components/Setting/CardSetting'



export default function Setting() {

    return (
    
    <Layout refreshDate='' selected ="bg-[#F3F3F3]" position="setting">
       
        <div className='font-bold text-[32px] text-hw-black ml-[24px] mt-[27px] mb-[27px]'>
        
        Configuración
        </div>

       <div className='m:flex m:flex-wrap m:ml-[24px] '>
        <CardSetting title="Permisos" path="/permission"  detail="Desde esta opción podrás administrar a todos tus usuarios del sistema, así como también podrás darle permisos para ver las distintas funcionalidades del sistema." icon="permiso"/>
        <CardSetting path="/zone" title="Zonas" detail="Para realizar un seguimiento más ordenado de tus sucursales crea zonas, que te permitirán agrupar todas las sucursales que deseas crear." icon="zona"/>
        <CardSetting title="Sucursales" path="/branch" detail="Administra desde esta opción todas tus sucursales en donde también podrás agregar los dispositivos que desees monitorear." icon="sucursal"/>
        <CardSetting path="/device_type" title="Tipos de dispositivos" detail="Identifica de forma más sencilla los distintos dispositivos que deseas monitorear. Desde acá podrás crear un alías para identificar diferentes dispositivos." icon="tipo dispositivo"/>
        <CardSetting path="/device_setting" title="Dispositivos" detail="Desde esta opción podrás administrar los diferentes dispositivos que desees monitorear." icon="dispositivo"/>

       </div>

   </Layout>
      
  )
}




