const LAST_COMMIT_TIME = import.meta.env.VITE_LAST_UPDATED;
const DEPLOYED_TIME = import.meta.env.VITE_LAST_DEPLOYED;

export const Footer = () => {
  return (
    <div className="bg-sky-600 text-slate-100 w-[100%] px-1 italic text-[0.7em] flex justify-between">
      <div className="flex gap-2">
        <img src="/assets/icons/github.svg"></img>

        <table>
          <tbody>
            <tr>
              <td>
                <a
                  className="underline"
                  href="https://github.com/ShootingStar91"
                >
                  ShootingStar91
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <a
                  className="underline"
                  href="https://github.com/ShootingStar91/lightforum"
                >
                  Repository
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <table>
        <tbody>
          <tr>
            <td className="pl-4">Last commit:</td>
            <td className="pl-1">{LAST_COMMIT_TIME}</td>
          </tr>
          <tr>
            <td className="pl-4">Last deploy:</td>
            <td className="pl-1">{DEPLOYED_TIME}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
