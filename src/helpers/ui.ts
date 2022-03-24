import { AxiosError } from 'axios';
import { QVueGlobals } from 'quasar';
import { Router } from 'vue-router';
import { ErrorData } from 'src/types';
import { ROUTE_NAME } from 'src/router';
import { userStore } from 'src/modules';
/**
 * UI Helper
 * @param $q 
 * @returns  
 */
export function uiHelper($q: QVueGlobals, $router?: Router) {
  /**
   * Deletes dialog
   * @param _config 
   */
  function deleteDialog(_config: { title?: string, message: string, onOk: CallableFunction }) {
    $q.dialog({
      title: _config.title,
      message: _config.message,
      ok: true,
      cancel: true

    }).onOk(() => { _config.onOk() })
  }
  /**
   * errorHandler
   * @param _error 
   */
  function errorHandler(_error?: AxiosError<ErrorData>, _default = 'Ha ocurrido un error') {
    console.log({ _error })
    if (_error && _error.response && _error.response.data) {
      if (_error.response.status === 401) {
        // Show notification
        $q.notify({
          type: 'negative',
          icon: 'mdi-alert-circle-outline',
          message: _default,
          position: 'center',
          actions: [
            { icon: 'mdi-close', color: 'white', handler: () => { /* ... */ } }
          ]
        });
        userStore.logout();
        if ($router) void $router.push({ name: ROUTE_NAME.LOGIN });
      } else {
        // Show notification
        // $q.notify({
        //     type: 'negative',
        //     icon: 'mdi-alert-circle-outline',
        //     message: _error.response.data.message,
        //     position: 'center'
        // });
        $q.notify({
          type: 'negative',
          icon: 'mdi-alert-circle-outline',
          message: _default,
          position: 'center',
          actions: [
            { icon: 'mdi-close', color: 'white', handler: () => { /* ... */ } }
          ]
        });
      }
    } else {
      $q.notify({
        type: 'negative',
        icon: 'mdi-alert-circle-outline',
        message: _default,
        position: 'center'
      });
    }
  }
  return {
    errorHandler, deleteDialog
  }
}

interface JsSha {
  update(_text: string): void;
  getHash(_type: 'HEX'): string;
}
export function cryptHash(_text: string): string {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const shaObj: JsSha = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' }) as JsSha;
  shaObj.update(_text);
  return shaObj.getHash('HEX');
}