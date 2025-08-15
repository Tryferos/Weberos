import {useWeberosQuery} from '@hooks/useWeberosQuery';
import Network from '@network/index';
import {PopupState} from '@store/popup-store';

export default function BrowsePopup({}: PopupState) {
  const {data, isLoading, error} = useWeberosQuery({
    key: '/mock',
    fetcher: () => Network.get({path: '/mock', validateOutput: true}),
  });
  return (
    <section>
      <header className="">
        <h1 className="font-heading text-lg py-2">Cool Users</h1>
      </header>
      <ul className="gap-2 flex flex-col">
        {data?.map(item => (
          <li
            key={item.id}
            className="flex flex-col gap-2 p-2 bg-blue-light/10 rounded hover:bg-blue-light/20">
            {item.first_name} {item.last_name} - {item.email}
          </li>
        ))}
      </ul>
      {error && <p>No data found.</p>}
      {isLoading && <p>Loading...</p>}
    </section>
  );
}
