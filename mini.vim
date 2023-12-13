" branch 2

set runtimepath^=~/.vim runtimepath+=~/.vim/after
let &packpath = &runtimepath

call plug#begin('~/.vim/plugged')
Plug 'tpope/vim-fugitive'
Plug 'tpope/vim-rhubarb'
Plug 'shumphrey/fugitive-gitlab.vim'
call plug#end()

let mapleader = ','
let maplocalleader = ';'
set nocompatible
set updatetime=300
set cmdheight=2
set tabstop=4

let g:fugitive_gitlab_domains = ['https://git.tsundere.moe']
