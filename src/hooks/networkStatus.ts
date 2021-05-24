//Importar los plugin que se van a usar desde capacitor/core
import { Plugins } from '@capacitor/core';
//Se hace instancia de los plugins que se van a usar como ejemplo se usa el plugin Network y Modals
//Pero se pueden instanciar muchos mas
const { Network } = Plugins;
const { Modals } = Plugins;
//Esto representa una funcion que engloba varias funcionalidades
export function networkStatus() {
  //Asi es la definicion de una funcionalidad
  const getStatusNetwork = async () => {
    let handler = Network.addListener('networkStatusChange', (status) => {
      console.log("Network status changed", status);
    });
    handler.remove();
    // Get the current network status
    let status = await Network.getStatus();
    let estado;
    if (status.connected) {
      estado = "conectado"
    } else {
      estado = "desconectado"
    }
    showAlert(estado, status.connectionType);
  }
  const showAlert = async (status: string, tipo: string) => {
    await Modals.alert({
      title: "Estado de la red",
      message: status.toUpperCase() + "---------" + tipo.toUpperCase()
    });
  }
  //Dentro del return se definen las funcionalidades que podran ser usadas en otros archivos
  return {
    getStatusNetwork
  }
}