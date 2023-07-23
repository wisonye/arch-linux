# C/C++

For C/C++ development, you need to install the following packages:

```bash
doas pacman --sync --refresh base-devel clang llvm
```

</br>

Then, try to find them by running:

```bash
ls -lht /usr/bin/{cc,c++,clang,clang++,clangd}

# lrwxrwxrwx 1 root root    8 May  3 04:09 /usr/bin/clang -> clang-15*
# lrwxrwxrwx 1 root root    5 May  3 04:09 /usr/bin/clang++ -> clang*
# -rwxr-xr-x 1 root root  25M May  3 04:09 /usr/bin/clangd*
# -rwxr-xr-x 4 root root 1.1M Feb  2 08:05 /usr/bin/c++*
# lrwxrwxrwx 1 root root    3 Feb  2 08:05 /usr/bin/cc -> gcc*
```

</br>


Basic compiler options:

| Option | Description | Example |
|--------|-------------|---------|
|`-o`| Write to ouput file, otherwise, output to `a.out` by default| `-o helloworld`|
|`-std=<standard>`| Specify the language standard to compile for| `-std=c++14`|
|`-stdlib=<library>` | Specify the C++ standard library to use; supported options are `libstdc++` and `libc++.` If not specified, platform default will be used.| `-stdlib=libstdc++`|
| `-ansi`| Same as `-std=c89`||
| `-O0, -O1, -O2, -O3, -Ofast, -Os, -Oz, -Og, -O, -O4`|Specify which optimization level to use, `-O0` Means "no optimization": this level compiles the fastest and generates the most debuggable code. `-O` Equivalent to `-O1`.|
|`-Wall`| Enable all the warnings which the authors of `cc` believe are worthwhile. Despite the name, it will not enable all the warnings `cc` is capable of.|
|`-llibrary`| Specify a function library to be used at `link` time. </br></br> The rule is that if the library is called `libsomething.a`, you give `cc` the argument `-lsomething`(without `lib` and extension part).</br></br> For example, the `math` library is `libm.a`, so you give `cc` the argument `-lm`.|
|`-pedantic-errors`| Error on language extensions. </br></br> It requests to produce an error if a feature from a later standard revision is used in an earlier mode.</br></br>For example if you use `-std=c99` standard to compile your code, but you use `_Generic` which only supported from `C11`, then `clang` will stop on that error.</br></br>This is very good for you to know which C standard you should use or forbidden some features in your code.|


</br>


For example, here is the sample `C++` source code, save it as `main.cpp`:

```c++
//
// How to compile and run this program?
//
// clang++ -Wall -O -std=c++17 -stdlib=libc++ -lm main.cpp -o test && ./test
//
// Because `<cmath>` library is in the system default library path (`/usr/lib/`),
// so you don't need to use `-lm` explicitly, linker (clang++) will find it at
// link time automatic:
// clang++ -Wall -O -std=c++17 -stdlib=libc++ main.cpp -o test && ./test
//
#include <cstdint>
#include <iostream>
#include <cmath>

using namespace std;

//
//
//
int add_together(int number_one, int number_2) {
    return number_one + number_2;
}

//
//
//
void show_info(char *name) {}

//
//
//
int main() {
    cout << "Hi, I'm Fion:)" << endl;

    uint8_t my_version = 0xFF;
    bool is_success = true;

    if (is_success) {
        cout << "'is_success' is equal to 'true'!!!\n\n";
    }

    show_info((char *)"asfasdf");

    int add_result = add_together(45, -99);
    cout << add_result << "\n\n";

    //
    // C++14 feature
    //
    auto return_value_itself = [](auto x) { return x; };

    int int_value = return_value_itself(888);
    string string_value = return_value_itself("Wison Ye");

    cout << "int_value :" << int_value << "\n";
    cout << "string_value :" << string_value << "\n";

    // `sqrt` comes from `<cmath>` (/usr/lib/libm.o)
    cout << "square root result :" << sqrt(100) << endl;

    return 0;
}

```

</br>

Then compile and run the program with the follow command:

```bash
clang++ -Wall -O -std=c++17 -stdlib=libc++ main.cpp -o test && ./test
```

</br>

## How to compile any `C/C++` project (from simple to complex level ) with `cmake`

`CMake` is cross-platform free and open-source software for build automation,
testing, packaging and installation of software by using a compiler-independent
method. `CMake` is not a build system itself.

It generates some kind of the portable make files that is able to build by
any suitable IDE or CLI environment, super useful.

Here are the regular steps that how to use it:

- Create the following folder structure:

    ```bash
    .
    ├── .clang-format
    ├── .gitignore
    ├── CMakeLists.txt
    ├── build
    └── src
        └── main.cpp
    ```

    </br>

- `CMakeLists.txt` with the following settings:

    ```bash
    cmake_minimum_required(VERSION "3.22")

    # Indicate the compliation environment (Host OS and CPU Arch)
    set(CMAKE_SYSTEM_NAME Linux)
    set(CMAKE_SYSTEM_PROCESSOR x86_64)

    # Compiler and linker
    # In `FreeBSD` `cc` and `c++` is the same with `clang` and `clang++`
    # set(CMAKE_C_COMPILER /usr/bin/cc)
    # set(CMAKE_CXX_COMPILER /usr/bin/c++)
    set(CMAKE_C_COMPILER /usr/bin/clang)
    set(CMAKE_CXX_COMPILER /usr/bin/clang++)

    # Compile flags
    # set(CMAKE_CXX_FLAGS "${CMAKE_C_FLAGS} -stdlib=libc++ -std=c99")
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -stdlib=libc++ -std=c++17")

    # Project name
    project("demo")

    # Compile and build executable
    add_executable("${PROJECT_NAME}" "src/main.cpp")
    ```

    </br>

- Put some code into `src/main.cpp`

    </br>

- Put settings to `.gitignore`

    ```bash
    build
    .cache
    ```

    </br>

- Optionally, you can put the following settings to `.clang-format` if you want
control the code format

    ```bash
    # BasedOnStyle: MICROSOFT
    BasedOnStyle: GOOGLE
    IndentWidth: 4
    ColumnLimit: 60
    ```

    </br>

- Run the following commands to build and run your program

    ```bash
    # Make sure you're in the project root folder

    #
    # Create and cd into the `build` folder
    #
    mkdir build && cd build

    #
    # Generate make files into `build` folder
    #
    # Generate the `compile_commands.json` for `clangd_extensions` neovim plugin
    #
    cmake -DCMAKE_EXPORT_COMPILE_COMMANDS=1 ..

    #
    # Make sure you're in `build` folder, build the entire project and run
    # the binary every time after making change to any source code.
    #
    make && ./demo
    ```

    </br>

## Terms

- `make`:

    Powerful program to compile C/C++ files define in `makefile/Makefile/MAKEFILE`.
    It always look at the first target (which follow by a `:`) if you don't provide
    any `target` as argument.

    The usual way to compile and install a program is by running `make && make install`.

    `install` target means copy all binaries to the default binary path, e.g.
    `/usr/bin`.

    If you want to uninstall/remove all copied binaries, run `make uninstall`.

    If you want to clean all compiled binaries and object files, run `make clean`.

    </br>

- `gmake`: GNU make

- `lldb`: LLVM debugger, FreeBSD default debugger

- `gdb`: GNU debugger

- `clangd`: A language server that provides IDE-like features to editors.

</br>




