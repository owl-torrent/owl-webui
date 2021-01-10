import * as configuration_api from './configuration';
import * as state_api from './state';
import * as seed_api from './seed';
import * as clients_api from './clients';
import * as torrents_api from './torrents';

const apiRegistry = {
    configuration: {
        get: configuration_api.get_configuration,
        change: configuration_api.change_configuration
    },
    state: {
        get: state_api.get_initial_state
    },
    seed: {
        start: seed_api.start_seed,
        stop: seed_api.stop_seed
    },
    clients: {
        get: clients_api.get_all
    },
    torrents: {
        add: torrents_api.add_torrent,
        delete: torrents_api.delete_torrent
    }
}

export default apiRegistry