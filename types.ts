import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Tag {
  label: string;
  type: 'tech' | 'category';
}

export interface CaseStudy {
  id: string;
  clientName: string;
  logoText: string;
  description: string;
  tags: string[];
  stats: { value: string; label: string }[];
  bgColor?: string;
  featured?: boolean;
}

export interface Project {
  name: string;
  description: string;
  tags: string[];
  stats: { value: string; label: string }[];
  icon: React.ReactNode;
}

export interface BlogPost {
  category: string;
  title: string;
  date: string;
  image?: string;
  bgColor?: string;
  textColor?: string;
}