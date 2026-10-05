import { useState } from "react";
import { Home, Receipt, CreditCard, Users, Settings, Bell, ChefHat, Printer, QrCode, PackageCheck, Monitor, Wallet, Sparkles, Smartphone } from "lucide-react";
import {
  AppShell, Sidebar, TopBar, FloatingDock, CommandBar, IconButton, Surface, Label, BigNumber, StatusPill,
  SegmentedControl, Toggle, Slider, ProgressBar, Metric, MetricGrid, MiniChart, StatusGraph, DeviceCard, ControlCard,
  IPhone17ProMax, ICON, type NavItem,
} from "@afuturo/ui";

const NAV: NavItem[] = [
  { id: "inicio", label: "Inicio", icon: <Home {...ICON} /> },
  { id: "pedidos", label: "Pedidos", icon: <Receipt {...ICON} />, badge: 7 },
  { id: "caja", label: "Caja", icon: <CreditCard {...ICON} /> },
  { id: "clientes", label: "Clientes", icon: <Users {...ICON} /> },
  { id: "ajustes", label: "Ajustes", icon: <Settings {...ICON} /> },
];

const SERIES = {
  dia: { data: [12, 18, 14, 22, 30, 26, 38, 44, 41, 52, 48, 61], labels: ["08", "10", "12", "14", "16", "18", "20", "22"], total: 184320 },
  semana: { data: [120, 140, 132, 160, 210, 260, 198], labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"], total: 1220400 },
  mes: { data: [420, 460, 410, 520, 580, 560, 640, 700, 690, 760, 820, 880], labels: ["1", "5", "10", "15", "20", "25", "30"], total: 4980200 },
};
type Period = keyof typeof SERIES;

const money = (v: number) => `$ ${v.toLocaleString("es-AR")}`;

const DEVICES = [
  { id: "caja", name: "Caja principal", meta: "Salón", icon: <Wallet {...ICON} />, value: "$ 48.2k" },
  { id: "cocina", name: "Impresora cocina", meta: "Cocina", icon: <Printer {...ICON} />, value: "12 tickets" },
  { id: "qr", name: "Lector QR", meta: "Mesas 1–12", icon: <QrCode {...ICON} />, value: "98 %" },
  { id: "cinta", name: "Cinta de paquetes", meta: "Depósito", icon: <PackageCheck {...ICON} />, value: "18 env." },
];

/** Demo interactiva: el sistema de gestión de negocios de A Futuro, instalado en "Nimbus Café". */
export function OsDemo() {
  const [nav, setNav] = useState("inicio");
  const [period, setPeriod] = useState<Period>("dia");
  const [selected, setSelected] = useState("caja");
  const [on, setOn] = useState<Record<string, boolean>>({ caja: true, cocina: true, qr: true, cinta: false });
  const [tiempo, setTiempo] = useState(12);
  const [avisar, setAvisar] = useState(true);
  const [auto, setAuto] = useState(false);
  const s = SERIES[period];

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px] xl:items-end">
      <AppShell
        embedded
        height={760}
        sidebar={<Sidebar items={NAV} active={nav} onSelect={setNav} groupLabel="Nimbus Café" footer={<StatusPill state="live" size="sm" variant="ghost">Sincronizado</StatusPill>} />}
        topbar={
          <TopBar
            crumbs={["Nimbus Café", "Hoy"]}
            title="Resumen"
            center={<CommandBar placeholder="Buscar pedido, mesa o cliente…" />}
            actions={
              <>
                <IconButton label="Notificaciones" variant="ghost"><Bell /></IconButton>
                <span className="ml-1 inline-flex size-9 items-center justify-center rounded-full bg-ink text-[12px] font-medium text-white">GC</span>
              </>
            }
          />
        }
        dock={<FloatingDock items={NAV.slice(0, 4)} active={nav} onSelect={setNav} />}
      >
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          {/* Hero del panel: UNA información dominante */}
          <Surface padding="md" className="flex min-h-[360px] flex-col">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <Label>Ingresos · {period === "dia" ? "hoy" : period === "semana" ? "esta semana" : "este mes"}</Label>
                <div className="mt-2">
                  <BigNumber value={s.total} prefix="$ " size="lg" accent />
                </div>
                <div className="mt-1 text-[13px] text-ink-2"><span className="font-medium text-ink">+12 %</span> vs. período anterior</div>
              </div>
              <SegmentedControl
                size="sm"
                label="Período"
                value={period}
                onChange={setPeriod}
                options={[{ value: "dia", label: "Día" }, { value: "semana", label: "Semana" }, { value: "mes", label: "Mes" }]}
              />
            </div>
            <div className="mt-auto pt-8">
              <StatusGraph key={period} data={s.data} labels={s.labels} height={150} format={(v) => money(v * 1000)} />
            </div>
          </Surface>

          <ControlCard
            title="Cocina"
            icon={<ChefHat />}
            value={`${tiempo} min`}
            action={<StatusPill state={avisar ? "live" : "idle"} size="sm" variant="ghost">{avisar ? "Avisando" : "Silencio"}</StatusPill>}
          >
            <Slider label="Tiempo objetivo por pedido" value={tiempo} onChange={setTiempo} min={5} max={30} unit=" min" />
            <Toggle label="Avisar demoras" description="Notifica al salón si un pedido supera el objetivo" checked={avisar} onChange={setAvisar} />
            <Toggle label="Cobro automático" description="Cierra la mesa al confirmar el pago" checked={auto} onChange={setAuto} />
            <ProgressBar label="Capacidad de cocina" value={auto ? 48 : 71} showValue />
          </ControlCard>
        </div>

        <MetricGrid className="mt-4">
          <Metric label="Pedidos" value={342} delta={8} deltaLabel="hoy"><MiniChart data={[8, 12, 10, 16, 14, 20, 18, 26, 24, 30]} type="area" height={36} /></Metric>
          <Metric label="Ticket promedio" value={5390} prefix="$ " delta={3} deltaLabel="semana"><MiniChart data={[4, 5, 4, 6, 5, 7, 6, 6, 7, 8]} height={36} neutral /></Metric>
          <Metric label="Clientes nuevos" value={48} delta={-2} deltaLabel="ayer"><MiniChart data={[3, 5, 4, 6, 8, 7, 9, 6, 8, 10, 9, 11]} type="bars" height={36} /></Metric>
          <Metric label="Satisfacción" value={4.9} decimals={1} unit="/ 5" live><ProgressBar value={98} size="sm" /></Metric>
        </MetricGrid>

        <div className="mt-6 flex items-center justify-between">
          <Label>Dispositivos</Label>
          <span className="text-[12px] text-ink-3">{Object.values(on).filter(Boolean).length} de {DEVICES.length} activos</span>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {DEVICES.map((d) => (
            <DeviceCard
              key={d.id}
              icon={d.icon}
              name={d.name}
              meta={d.meta}
              value={d.value}
              state={on[d.id] ? "live" : "off"}
              selected={selected === d.id}
              onSelect={() => setSelected(d.id)}
              on={on[d.id]}
              onToggle={(v) => setOn((o) => ({ ...o, [d.id]: v }))}
            />
          ))}
        </div>
      </AppShell>

      <div className="hidden justify-center xl:flex">
        <IPhone17ProMax width={300} color="silver" float>
          <MobileScreen nav={nav} setNav={setNav} total={s.total} data={s.data} on={on} />
        </IPhone17ProMax>
      </div>
    </div>
  );
}

function MobileScreen({ nav, setNav, total, data, on }: { nav: string; setNav: (v: string) => void; total: number; data: number[]; on: Record<string, boolean> }) {
  return (
    <div className="af-studio relative h-full w-full px-5 pt-[74px] text-ink">
      <div className="flex items-center justify-between">
        <div>
          <Label>Nimbus Café</Label>
          <div className="mt-1 font-display text-[26px] font-medium tracking-[-0.03em]">Hoy</div>
        </div>
        <StatusPill state="live" size="sm">En vivo</StatusPill>
      </div>
      <Surface padding="sm" radius="lg" className="mt-5">
        <Label>Ingresos</Label>
        <div className="mt-1 font-display text-[36px] font-medium tabular-nums tracking-[-0.03em] text-accent">{money(total)}</div>
        <div className="mt-3"><MiniChart data={data} type="area" height={56} /></div>
      </Surface>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <Metric label="Pedidos" value={342} size="sm" countUp={false} />
        <Metric label="Ticket" value="5.390" prefix="$ " size="sm" />
      </div>
      <div className="mt-5 flex items-center justify-between"><Label>Dispositivos</Label><span className="text-[12px] text-ink-3">{Object.values(on).filter(Boolean).length} activos</span></div>
      <div className="mt-3 space-y-2">
        {DEVICES.slice(0, 3).map((d) => (
          <Surface key={d.id} padding="xs" radius="md" className="flex items-center gap-3">
            <span className={`inline-flex size-9 items-center justify-center rounded-sm ${on[d.id] ? "bg-accent-50 text-accent" : "bg-surface-3 text-ink-2"}`}>{d.icon}</span>
            <span className="flex-1 text-[14px] font-medium">{d.name}</span>
            <span className={`size-1.5 rounded-full ${on[d.id] ? "bg-accent" : "bg-ink-4"}`} aria-hidden />
            <span className="sr-only">{on[d.id] ? "Activo" : "Apagado"}</span>
          </Surface>
        ))}
      </div>
      <FloatingDock
        className="bottom-7"
        items={[
          { id: "inicio", label: "Inicio", icon: <Home {...ICON} /> },
          { id: "pedidos", label: "Pedidos", icon: <Receipt {...ICON} /> },
          { id: "caja", label: "Caja", icon: <CreditCard {...ICON} /> },
          { id: "ajustes", label: "Ajustes", icon: <Settings {...ICON} /> },
        ]}
        active={nav}
        onSelect={setNav}
      />
    </div>
  );
}

/** Tira de componentes sueltos para el final de la sección de producto. */
export function ComponentStrip() {
  const [seg, setSeg] = useState("auto");
  const [t, setT] = useState(true);
  const [v, setV] = useState(64);
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <Surface padding="sm" radius="lg" className="flex flex-col gap-4">
        <Label>Segmented · Toggle</Label>
        <SegmentedControl block value={seg} onChange={setSeg} options={[{ value: "auto", label: "Auto", icon: <Sparkles {...ICON} /> }, { value: "manual", label: "Manual" }, { value: "off", label: "Off" }]} />
        <Toggle label="Modo silencioso" checked={t} onChange={setT} />
      </Surface>
      <Surface padding="sm" radius="lg" className="flex flex-col gap-4">
        <Label>Slider · Progress</Label>
        <Slider label="Brillo" value={v} onChange={setV} unit=" %" />
        <ProgressBar label="Sincronización" value={v} showValue size="sm" />
      </Surface>
      <Surface padding="sm" radius="lg" className="flex flex-col gap-3">
        <Label>Status · Botones</Label>
        <div className="flex flex-wrap gap-2">
          <StatusPill state="live">En vivo</StatusPill>
          <StatusPill state="idle" variant="ghost">En espera</StatusPill>
          <StatusPill variant="ink" icon={<Smartphone />}>iOS 26</StatusPill>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <IconButton label="Buscar"><Sparkles /></IconButton>
          <IconButton label="Activo" active><Bell /></IconButton>
          <IconButton label="Oscuro" variant="ink"><Monitor /></IconButton>
        </div>
      </Surface>
    </div>
  );
}
