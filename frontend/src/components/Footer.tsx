const LAST_COMMIT_TIME = import.meta.env.VITE_LAST_UPDATED;
const DEPLOYED_TIME = import.meta.env.VITE_LAST_DEPLOYED;

export const Footer = () => {
  return (
    <div className="bg-sky-600 text-white w-[100%] p-2 text-xs flex justify-between">
        <div className="flex gap-2">
        <i className="pl-1 pt-1 fa fa-github fa-2x"></i>

      <table>
        <tr>
          <td>
            <a className="link" href="https://github.com/ShootingStar91">ShootingStar91</a>
          </td>
        </tr>
        <tr>
          <td>
            <a className="link" href="https://github.com/ShootingStar91/lightforum">
               Repository
            </a>
          </td>
        </tr>
      </table>
      </div>
      <table>
        <tr>
          <td className="pl-8">Last commit:</td>
          <td className="pl-2">{LAST_COMMIT_TIME}</td>
        </tr>
        <tr>
          <td className="pl-8">Last deploy:</td>
          <td className="pl-2">{DEPLOYED_TIME}</td>
        </tr>
      </table>
    </div>
  );
};
