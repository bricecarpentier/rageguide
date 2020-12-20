const getServerInformationNet = (addr: Deno.NetAddr): string =>
  `http://${addr.hostname}:${addr.port}`;
const getServerInformationUnix = (addr: Deno.UnixAddr): string =>
  `unix://${addr.path}`;

const getServerInformation = (addr: Deno.Addr): string => {
  switch (addr.transport) {
    case "tcp":
    case "udp":
      return getServerInformationNet(addr);
    case "unix":
    case "unixpacket":
      return getServerInformationUnix(addr);
    default:
      throw new Error("unrecognized transport");
  }
};

export default getServerInformation;
