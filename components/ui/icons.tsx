import type { IconType } from "react-icons";
import {
  SiCss, SiDocker, SiExpress, SiFigma, SiFirebase, SiGit, SiGooglecloud, SiGooglegemini,
  SiHtml5, SiJavascript, SiJsonwebtokens, SiLaravel, SiLinux, SiMongodb, SiMysql, SiNextdotjs,
  SiNodedotjs, SiOpenrouter, SiPhp, SiPostman, SiPython, SiReact, SiSupabase, SiTailwindcss,
  SiTypescript, SiVercel,
} from "react-icons/si";
import { FaAws, FaChartLine, FaDatabase, FaGithub, FaJava, FaLinkedin, FaServer } from "react-icons/fa6";
import { VscAzure } from "react-icons/vsc";
import { Mail } from "lucide-react";
import type { SocialLink, TechIconKey } from "@/data/portfolio";

interface TechIconSpec {
  Icon: IconType;
  color: string;
}

export const techIcons: Record<TechIconKey, TechIconSpec> = {
  typescript: { Icon: SiTypescript, color: "#3178C6" },
  javascript: { Icon: SiJavascript, color: "#F7DF1E" },
  python: { Icon: SiPython, color: "#4B8BBE" },
  java: { Icon: FaJava, color: "#ED8B00" },
  php: { Icon: SiPhp, color: "#8892BF" },
  sql: { Icon: FaDatabase, color: "#94A3B8" },
  html: { Icon: SiHtml5, color: "#E34F26" },
  css: { Icon: SiCss, color: "#2965F1" },
  nodejs: { Icon: SiNodedotjs, color: "#5FA04E" },
  express: { Icon: SiExpress, color: "#E2E8F0" },
  laravel: { Icon: SiLaravel, color: "#FF2D20" },
  rest: { Icon: FaServer, color: "#94A3B8" },
  jwt: { Icon: SiJsonwebtokens, color: "#E2E8F0" },
  mongodb: { Icon: SiMongodb, color: "#47A248" },
  mysql: { Icon: SiMysql, color: "#4479A1" },
  react: { Icon: SiReact, color: "#61DAFB" },
  nextjs: { Icon: SiNextdotjs, color: "#E2E8F0" },
  tailwind: { Icon: SiTailwindcss, color: "#38BDF8" },
  aws: { Icon: FaAws, color: "#FF9900" },
  azure: { Icon: VscAzure, color: "#0089D6" },
  firebase: { Icon: SiFirebase, color: "#FFCA28" },
  supabase: { Icon: SiSupabase, color: "#3ECF8E" },
  googlecloud: { Icon: SiGooglecloud, color: "#4285F4" },
  vercel: { Icon: SiVercel, color: "#E2E8F0" },
  lightgbm: { Icon: FaChartLine, color: "#A3E635" },
  gemini: { Icon: SiGooglegemini, color: "#8E75F2" },
  openrouter: { Icon: SiOpenrouter, color: "#E2E8F0" },
  docker: { Icon: SiDocker, color: "#2496ED" },
  git: { Icon: SiGit, color: "#F05032" },
  linux: { Icon: SiLinux, color: "#FCC624" },
  postman: { Icon: SiPostman, color: "#FF6C37" },
  figma: { Icon: SiFigma, color: "#F24E1E" },
};

export function SocialIcon({ kind, size = 18 }: { kind: SocialLink["kind"]; size?: number }) {
  if (kind === "github") return <FaGithub size={size} aria-hidden />;
  if (kind === "linkedin") return <FaLinkedin size={size} aria-hidden />;
  return <Mail size={size} aria-hidden />;
}
